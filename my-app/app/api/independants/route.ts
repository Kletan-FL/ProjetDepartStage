import db from "@/lib/db";

import type { Independant } from "@/types/independant";

/**
 * * Requête GET
 * On récupère tous les indépendants
 * ! Correspond au GET ALL et non au GET [id]
 * @returns un JSON avec les indépendants
 */
export function GET() {
  try {
    const independants = db.prepare("SELECT * FROM INDEPENDANT").all() as Independant[];
    return Response.json(independants);
  } catch (err) {
    return new Response(JSON.stringify({ Erreur : "Erreur DB", Details : String(err) }), { status : 500 });
  }
}

/**
 * * Requête POST
 * On utilise les données envoyées pour créer un nouvel indépendant
 * @param req les données du formulaire
 * @returns l'ID du nouvel indépendant
 */
export async function POST(req : Request) {
  try {
    const data = await req.json();
    const sql = db.prepare("INSERT INTO INDEPENDANT (NOM, PRENOM, EMAIL, TELEPHONE, TJM_SOUHAITE) VALUES (?, ?, ?, ?, ?)");
    const resultat = sql.run(data.NOM, data.PRENOM, data.EMAIL, data.TELEPHONE, data.TJM_SOUHAITE);
    return new Response(JSON.stringify({ ID : resultat.lastInsertRowid }), { status : 201 });
  } catch (err) {
    return new Response(JSON.stringify({ Erreur : "Erreur DB", Details : String(err) }), { status : 500 });
  }
}