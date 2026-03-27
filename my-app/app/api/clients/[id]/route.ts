import db from "@/lib/db";

/**
 * * Requête GET [id]
 * On récupère un client grâce à son id
 * // @param req pas utilisé, mais obligatoire pour la signature
 * @param contenu objet contenant les paramètres de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un JSON représentant le client
 */
export async function GET(req: Request, contenu : { params : Promise<{ id : string }> }) {
  const params = await contenu.params;

  const client = db.prepare("SELECT * FROM CLIENT WHERE IDC = ?").get(params.id);

  if (!client) {
    return new Response(JSON.stringify({ Erreur : "Client not found" }), { status: 404 });
  }

  return Response.json(client);
}

// TODO : PUT et DELETE
// ? PUT Async et DELETE non ?