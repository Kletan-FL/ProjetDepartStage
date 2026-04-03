"use server";

import db from "@/lib/db";
import { independantSchema } from "@/lib/schemas/independantSchema";
import type { Independant } from "@/types/independant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getIndependants(): Promise<Independant[]> {
  return db.prepare("SELECT * FROM INDEPENDANT").all() as Independant[];
}

export async function getIndependant(id: number): Promise<Independant | null> {
  return (
    (db
      .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
      .get(id) as Independant) ?? null
  );
}

export async function createIndependant(values: unknown) {
  const parsed = independantSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  const { NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE } = parsed.data;
  db.prepare(
    "INSERT INTO INDEPENDANT (NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE) VALUES (?, ?, ?, ?, ?)",
  ).run(NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE);

  revalidatePath("/independants"); // invalide le cache de la liste
  redirect("/independants"); // redirige sans useRouter
}

export async function updateIndependant(id: number, values: unknown) {
  const parsed = independantSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  const ancien = db
    .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
    .get(id) as Independant | null;
  if (!ancien) throw new Error("Indépendant introuvable");

  const maj = { ...ancien, ...parsed.data };
  db.prepare(
    "UPDATE INDEPENDANT SET NOM = ?, PRENOM = ?, EMAIL = ?, TELEPHONE = ?, TJM_SOUHAITE = ? WHERE IDI = ?",
  ).run(maj.NOM, maj.PRENOM, maj.EMAIL, maj.TELEPHONE, maj.TJM_SOUHAITE, id);

  revalidatePath(`/independants/${id}`);
  revalidatePath("/independants");
}

export async function deleteIndependant(id: number) {
  const resultat = db.prepare("DELETE FROM INDEPENDANT WHERE IDI = ?").run(id);
  if (resultat.changes === 0) throw new Error("Indépendant introuvable");

  revalidatePath("/independants");
}
