import db from "@/lib/db";

/**
 * * Requête GET
 * On récupère tous les clients
 * ! Correspond au GET ALL et non au GET [id]
 * @returns un JSON avec les clients
 */
export function GET() {
  try {
    const clients = db.prepare("SELECT * FROM CLIENT").all();
    return Response.json(clients);
  } catch (err) {
    return new Response(JSON.stringify({ Erreur : "Erreur DB", Details : String(err) }), { status : 500 });
  }
}

/**
 * * Requête POST
 * On utilise les données envoyées pour créer un nouveau client
 * @param req les données du formulaire
 * @returns l'ID du nouveau client
 */
export async function POST(req : Request) {
  try {
    const data = await req.json();
    const sql = db.prepare("INSERT INTO CLIENT (NOM, SIRET, VILLE, DOMAINE, ADRESSE) VALUES (?, ?, ?, ?, ?)");
    const resultat = sql.run(data.NOM, data.SIRET, data.VILLE, data.DOMAINE, data.ADRESSE);
    return new Response(JSON.stringify({ ID : resultat.lastInsertRowid }), { status : 201 });
  } catch (err) {
    return new Response(JSON.stringify({ Erreur : "Erreur DB", Details : String(err) }), { status : 500 });
  }
}