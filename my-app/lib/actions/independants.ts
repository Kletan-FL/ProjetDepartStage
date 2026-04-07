"use server";

import db from "@/lib/db";
import { independantSchema } from "@/lib/schemas/independantSchema";
import type { Independant } from "@/types/independant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Récupère la liste complète des indépendants.
 *
 * @returns un tableau de Independant (peut être vide)
 */
export async function getIndependants(): Promise<Independant[]> {
  return db.prepare("SELECT * FROM INDEPENDANT").all() as Independant[];
}

/**
 * Récupère un indépendant spécifique via son identifiant.
 *
 * @param id identifiant de l'indépendant (IDI)
 * @returns l'indépendant correspondant ou null
 */
export async function getIndependant(id: number): Promise<Independant | null> {
  return (
    (db
      .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
      .get(id) as Independant) ?? null
  );
}

/**
 * Crée un nouvel indépendant dans la base.
 *
 * @param values données pour l'insertion
 * @throws Error si les données sont invalides
 */
export async function createIndependant(values: unknown) {
  // Validation des données par Zod
  const parsed = independantSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Insertion
  const { NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE } = parsed.data;
  db.prepare(
    "INSERT INTO INDEPENDANT (NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE) VALUES (?, ?, ?, ?, ?)",
  ).run(NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE);

  revalidatePath("/independants");
  redirect("/independants");
}

/**
 * Met à jour un indépendant existant.
 *
 * @param id identifiant de l'indépendant (IDI)
 * @param values données pour la modification
 * @throws Error si l'indépendant n'existe pas ou si les données sont invalide
 */
export async function updateIndependant(id: number, values: unknown) {
  // Validation des données par Zod
  const parsed = independantSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Vérification de l'existence de l'indépendant
  const ancien = db
    .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
    .get(id) as Independant | null;
  if (!ancien) throw new Error("Indépendant introuvable");

  // Modification
  const maj = { ...ancien, ...parsed.data };
  db.prepare(
    "UPDATE INDEPENDANT SET NOM = ?, PRENOM = ?, EMAIL = ?, TELEPHONE = ?, TJM_SOUHAITE = ? WHERE IDI = ?",
  ).run(maj.NOM, maj.PRENOM, maj.EMAIL, maj.TELEPHONE, maj.TJM_SOUHAITE, id);

  revalidatePath(`/independants/${id}`);
  revalidatePath("/independants");
}

/**
 * Supprime un indépendant si aucune prestation ne lui est liée.
 *
 * @param id identifiant de l'indépendant (IDI)
 * @throws Error si l'indépendant est introuvable ou lié à des prestations
 */
export async function deleteIndependant(id: number) {
  // Vérification de l'existence de prestation pour cet indépendant
  const prestations = db
    .prepare("SELECT 1 FROM PRESTATION WHERE IDI = ? LIMIT 1")
    .get(id);

  if (prestations) {
    throw new Error(
      "Impossible de supprimer cet indépendant : des prestations y sont liées.",
    );
  }

  // Tentative de suppression l'indépendant
  const resultat = db.prepare("DELETE FROM INDEPENDANT WHERE IDI = ?").run(id);
  if (resultat.changes === 0) throw new Error("Indépendant introuvable");

  revalidatePath("/independants");
}
