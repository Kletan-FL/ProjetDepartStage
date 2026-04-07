"use server";

import db from "@/lib/db";
import { clientSchema } from "@/lib/schemas/clientSchema";
import type { Client } from "@/types/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Récupère la liste complète des clients.
 *
 * @returns un tableau de Client (peut être vide)
 */
export async function getClients(): Promise<Client[]> {
  return db.prepare("SELECT * FROM CLIENT").all() as Client[];
}

/**
 * Récupère un client spécifique via son identifiant.
 *
 * @param id identifiant du client (IDC)
 * @returns le client correspondant ou null
 */
export async function getClient(id: number): Promise<Client | null> {
  return (
    (db.prepare("SELECT * FROM CLIENT WHERE IDC = ?").get(id) as Client) ?? null
  );
}

/**
 * Crée un nouveau client dans la base.
 *
 * @param values données pour l'insertion
 * @throws Error si les données sont invalides
 */
export async function createClient(values: unknown) {
  // Validation des données par Zod
  const parsed = clientSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Insertion
  const { NOM, SIRET, VILLE, DOMAINE, ADRESSE } = parsed.data;
  db.prepare(
    "INSERT INTO CLIENT (NOM, SIRET, VILLE, DOMAINE, ADRESSE) VALUES (?, ?, ?, ?, ?)",
  ).run(NOM, SIRET, VILLE, DOMAINE, ADRESSE);

  revalidatePath("/clients");
  redirect("/clients");
}

/**
 * Met à jour un client existant.
 *
 * @param id identifiant du client (IDC)
 * @param values données pour la modification
 * @throws Error si le client n'existe pas ou si les données sont invalide
 */
export async function updateClient(id: number, values: unknown) {
  // Validation des données par Zod
  const parsed = clientSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Vérification de l'existence du client
  const ancien = db
    .prepare("SELECT * FROM CLIENT WHERE IDC = ?")
    .get(id) as Client | null;
  if (!ancien) throw new Error("Client introuvable");

  // Modification
  const maj = { ...ancien, ...parsed.data };
  db.prepare(
    "UPDATE CLIENT SET NOM = ?, SIRET = ?, VILLE = ?, DOMAINE = ?, ADRESSE = ? WHERE IDC = ?",
  ).run(maj.NOM, maj.SIRET, maj.VILLE, maj.DOMAINE, maj.ADRESSE, id);

  revalidatePath(`/clients/${id}`);
  revalidatePath("/clients");
}

/**
 * Supprime un client si aucune prestation ne lui est liée.
 *
 * @param id identifiant du client (IDC)
 * @throws Error si le client est introuvable ou lié à des prestations
 */
export async function deleteClient(id: number) {
  // Vérification de l'existence de prestation pour ce client
  const prestations = db
    .prepare("SELECT 1 FROM PRESTATION WHERE IDC = ? LIMIT 1")
    .get(id);

  if (prestations) {
    throw new Error(
      "Impossible de supprimer ce client : des prestations y sont liées.",
    );
  }

  // Tentative de suppression le client
  const resultat = db.prepare("DELETE FROM CLIENT WHERE IDC = ?").run(id);
  if (resultat.changes === 0) throw new Error("Client introuvable");

  revalidatePath("/clients");
}
