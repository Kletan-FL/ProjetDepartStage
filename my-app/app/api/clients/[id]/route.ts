import db from "@/lib/db";

import type { Client } from "@/types/client";

/**
 * * Requête GET [id]
 * On récupère un client grâce à son id
 * // @param req pas utilisé, mais obligatoire pour la signature
 * @param contenu objet contenant les paramètres dynamiques de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un JSON représentant le client
 */
export async function GET(
  req: Request,
  contenu: { params: Promise<{ id: string }> },
) {
  const params = await contenu.params;

  const client = db
    .prepare("SELECT * FROM CLIENT WHERE IDC = ?")
    .get(params.id) as Client;

  if (!client) {
    return new Response(JSON.stringify({ Erreur: "Client not found" }), {
      status: 404,
    });
  }

  return Response.json(client);
}

/**
 * * Requête PUT [id]
 * On met à jour un client existant grâce à son id
 * @param req contient les nouvelles données du client
 * @param contenu objet contenant les paramètres dynamiques de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un JSON indiquant le nombre d'attributs mis à jour
 */
export async function PUT(
  req: Request,
  contenu: { params: Promise<{ id: string }> },
) {
  const params = await contenu.params;

  const data = await req.json();

  const ancien = db
    .prepare("SELECT * FROM CLIENT WHERE IDC = ?")
    .get(params.id) as Client;

  if (!ancien) {
    return new Response(JSON.stringify({ Erreur: "Client not found" }), {
      status: 404,
    });
  }

  let changements = 0;

  if (data.NOM !== ancien.NOM) changements++;
  if (data.SIRET !== ancien.SIRET) changements++;
  if (data.VILLE !== ancien.VILLE) changements++;
  if (data.DOMAINE !== ancien.DOMAINE) changements++;
  if (data.ADRESSE !== ancien.ADRESSE) changements++;

  const sql = db.prepare(
    "UPDATE CLIENT SET NOM = ?, SIRET = ?, VILLE = ?, DOMAINE = ?, ADRESSE = ? WHERE IDC = ?",
  );

  sql.run(
    data.NOM,
    data.SIRET,
    data.VILLE,
    data.DOMAINE,
    data.ADRESSE,
    params.id,
  );

  return Response.json({ Attributs_modifies: changements });
}

/**
 * * Requête DELETE [id]
 * On supprime un client grâce à son id
 * // @param req pas utilisé, mais obligatoire pour la signature
 * @param contenu objet contenant les paramètres dynamiques de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un message de confirmation
 */
export async function DELETE(
  req: Request,
  contenu: { params: Promise<{ id: string }> },
) {
  const params = await contenu.params;

  const sql = db.prepare("DELETE FROM CLIENT WHERE IDC = ?");
  const resultat = sql.run(params.id);

  if (resultat.changes === 0) {
    return new Response(JSON.stringify({ Erreur: "Client not found" }), {
      status: 404,
    });
  }

  return Response.json({ Message: "Client supprime" });
}
