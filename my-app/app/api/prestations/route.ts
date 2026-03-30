import db from "@/lib/db";

import type { Prestation } from "@/types/prestation";

/**
 * * Requête GET
 * On récupère toutes les prestations
 * ! Correspond au GET ALL et non au GET [id]
 * @returns un JSON avec les prestations
 */
export function GET() {
  try {
    const prestations = db
      .prepare("SELECT * FROM PRESTATION")
      .all() as Prestation[];
    return Response.json(prestations);
  } catch (err) {
    return new Response(
      JSON.stringify({ Erreur: "Erreur DB", Details: String(err) }),
      { status: 500 },
    );
  }
}

/**
 * * Requête POST
 * On utilise les données envoyées pour créer une nouvelle prestation
 * @param req les données du formulaire
 * @returns l'ID de la nouvelle prestation
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sql = db.prepare(
      "INSERT INTO PRESTATION (IDC, IDI, INTITULE, DESCRIPTION, DATE_DEBUT, DATE_FIN, TJM_FINAL) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    const resultat = sql.run(
      data.IDC,
      data.IDI,
      data.INTITULE,
      data.DESCRIPTION,
      data.DATE_DEBUT,
      data.DATE_FIN,
      data.TJM_FINAL,
    );
    return new Response(JSON.stringify({ ID: resultat.lastInsertRowid }), {
      status: 201,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ Erreur: "Erreur DB", Details: String(err) }),
      { status: 500 },
    );
  }
}
