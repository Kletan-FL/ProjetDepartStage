import db from "@/lib/db";

import type { Prestation } from "@/types/prestation";

/**
 * * Requête GET [id]
 * On récupère une prestation grâce à son id
 * // @param req pas utilisé, mais obligatoire pour la signature
 * @param contenu objet contenant les paramètres dynamiques de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un JSON représentant la prestation
 */
export async function GET(
  req: Request,
  contenu: { params: Promise<{ id: string }> },
) {
  const params = await contenu.params;

  const prestation = db
    .prepare("SELECT * FROM PRESTATION WHERE IDP = ?")
    .get(params.id) as Prestation;

  if (!prestation) {
    return new Response(JSON.stringify({ Erreur: "Prestation not found" }), {
      status: 404,
    });
  }

  return Response.json(prestation);
}

/**
 * * Requête PUT [id]
 * On met à jour une prestation existante grâce à son id
 * @param req contient les nouvelles données de la prestation
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
    .prepare("SELECT * FROM PRESTATION WHERE IDP = ?")
    .get(params.id) as Prestation;

  if (!ancien) {
    return new Response(JSON.stringify({ Erreur: "Prestation not found" }), {
      status: 404,
    });
  }

  let changements = 0;

  if (data.IDC !== ancien.IDC) changements++;
  if (data.IDI !== ancien.IDI) changements++;
  if (data.INTITULE !== ancien.INTITULE) changements++;
  if (data.DESCRIPTION !== ancien.DESCRIPTION) changements++;
  if (data.DATE_DEBUT !== ancien.DATE_DEBUT) changements++;
  if (data.DATE_FIN !== ancien.DATE_FIN) changements++;
  if (data.TJM_FINAL !== ancien.TJM_FINAL) changements++;

  const sql = db.prepare(
    "UPDATE PRESTATION SET IDC = ?, IDI = ?, INTITULE = ?, DESCRIPTION = ?, DATE_DEBUT = ?, DATE_FIN = ?, TJM_FINAL = ? WHERE IDC = ?",
  );

  sql.run(
    data.IDC,
    data.IDI,
    data.INTITULE,
    data.DESCRIPTION,
    data.DATE_DEBUT,
    data.DATE_FIN,
    data.TJM_FINAL,
    params.id,
  );

  return Response.json({ Attributs_modifies: changements });
}

/**
 * * Requête DELETE [id]
 * On supprime une prestation grâce à son id
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

  const sql = db.prepare("DELETE FROM PRESTATION WHERE IDP = ?");
  const resultat = sql.run(params.id);

  if (resultat.changes === 0) {
    return new Response(JSON.stringify({ Erreur: "Prestation not found" }), {
      status: 404,
    });
  }

  return Response.json({ Message: "Prestation supprimee" });
}
