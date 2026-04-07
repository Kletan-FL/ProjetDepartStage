"use server";

import db from "@/lib/db";
import { prestationSchema } from "@/lib/schemas/prestationSchema";
import type { Prestation, PrestationAvecNoms } from "@/types/prestation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Récupère la liste complète des prestations.
 *
 * @returns un tableau de Prestation (peut être vide)
 */
export async function getPrestations() {
  return db
    .prepare(
      `
    SELECT P.*, C.NOM AS NOM_CLIENT, I.NOM AS NOM_INDEPENDANT, I.PRENOM AS PRENOM_INDEPENDANT
    FROM PRESTATION P
    JOIN CLIENT C ON P.IDC = C.IDC
    JOIN INDEPENDANT I ON P.IDI = I.IDI
  `,
    )
    .all() as PrestationAvecNoms[];
}

/**
 * Récupère une prestation spécifique via son identifiant.
 *
 * @param id identifiant de la prestation (IDP)
 * @returns la prestation correspondante ou null
 */
export async function getPrestation(id: number) {
  return (
    (db
      .prepare(
        `
    SELECT P.*, C.NOM AS NOM_CLIENT, I.NOM AS NOM_INDEPENDANT, I.PRENOM AS PRENOM_INDEPENDANT
    FROM PRESTATION P
    JOIN CLIENT C ON P.IDC = C.IDC
    JOIN INDEPENDANT I ON P.IDI = I.IDI
    WHERE P.IDP = ?
  `,
      )
      .get(id) as PrestationAvecNoms) ?? null
  );
}

/**
 * Crée une nouvelle prestation dans la base.
 *
 * @param values données pour l'insertion
 * @throws Error si les données sont invalides
 */
export async function createPrestation(values: unknown) {
  // Validation des données par Zod
  const parsed = prestationSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Insertion
  const { IDC, IDI, INTITULE, DESCRIPTION, DATE_DEBUT, DATE_FIN, TJM_FINAL } =
    parsed.data;

  db.prepare(
    `
    INSERT INTO PRESTATION (IDC, IDI, INTITULE, DESCRIPTION, DATE_DEBUT, DATE_FIN, TJM_FINAL)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  ).run(
    IDC,
    IDI,
    INTITULE,
    DESCRIPTION ?? null,
    DATE_DEBUT ?? null,
    DATE_FIN ?? null,
    TJM_FINAL ?? null,
  );

  revalidatePath("/prestations");
  redirect("/prestations");
}

/**
 * Met à jour une prestation existante.
 *
 * @param id identifiant de la prestation (IDP)
 * @param values données pour la modification
 * @throws Error si la prestation n'existe pas ou si les données sont invalide
 */
export async function updatePrestation(id: number, values: unknown) {
  // Validation des données par Zod
  const parsed = prestationSchema.safeParse(values);
  if (!parsed.success) throw new Error("Données invalides");

  // Vérification de l'existence de la prestation
  const ancienne = db
    .prepare("SELECT * FROM PRESTATION WHERE IDP = ?")
    .get(id) as Prestation | null;
  if (!ancienne) throw new Error("Prestation introuvable");

  // Modification
  const maj = { ...ancienne, ...parsed.data };

  db.prepare(
    `
    UPDATE PRESTATION
    SET IDC = ?, 
        IDI = ?, 
        INTITULE = ?, 
        DESCRIPTION = ?, 
        DATE_DEBUT = ?, 
        DATE_FIN = ?, 
        TJM_FINAL = ?
    WHERE IDP = ?
  `,
  ).run(
    maj.IDC,
    maj.IDI,
    maj.INTITULE,
    maj.DESCRIPTION ?? null,
    maj.DATE_DEBUT ?? null,
    maj.DATE_FIN ?? null,
    maj.TJM_FINAL ?? null,
    id,
  );

  revalidatePath(`/prestations/${id}`);
  revalidatePath("/prestations");
}
