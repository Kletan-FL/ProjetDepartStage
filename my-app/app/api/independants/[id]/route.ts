import db from "@/lib/db";

import type { Independant } from "@/types/independant";

/**
 * * Requête GET [id]
 * On récupère un indépendant grâce à son id
 * // @param req pas utilisé, mais obligatoire pour la signature
 * @param contenu objet contenant les paramètres dynamiques de la route
 * ! contenu.params est une Promesse qui doit être résolue pour avoir l'id
 * @returns un JSON représentant l'indépendant
 */
export async function GET(
  req: Request,
  contenu: { params: Promise<{ id: string }> },
) {
  const params = await contenu.params;

  const independant = db
    .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
    .get(params.id) as Independant;

  if (!independant) {
    return new Response(JSON.stringify({ Erreur: "Independant not found" }), {
      status: 404,
    });
  }

  return Response.json(independant);
}

/**
 * * Requête PUT [id]
 * On met à jour un indépendant existant grâce à son id
 * @param req contient les nouvelles données de l'indépendant
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
    .prepare("SELECT * FROM INDEPENDANT WHERE IDI = ?")
    .get(params.id) as Independant;

  if (!ancien) {
    return new Response(JSON.stringify({ Erreur: "Independant not found" }), {
      status: 404,
    });
  }

  let changements = 0;

  if (data.NOM !== ancien.NOM) changements++;
  if (data.PRENOM !== ancien.PRENOM) changements++;
  if (data.EMAIL !== ancien.EMAIL) changements++;
  if (data.TELEPHONE !== ancien.TELEPHONE) changements++;
  if (data.TJM_SOUHAITE !== ancien.TJM_SOUHAITE) changements++;

  const sql = db.prepare(
    "UPDATE CLIENT SET NOM = ?, PRENOM = ?, EMAIL = ?, TELEPHONE = ?, TJM_SOUHAITE = ? WHERE IDI = ?",
  );

  sql.run(
    data.NOM,
    data.PRENOM,
    data.EMAIL,
    data.TELEPHONE,
    data.TJM_SOUHAITE,
    params.id,
  );

  return Response.json({ Attributs_modifies: changements });
}

/**
 * * Requête DELETE [id]
 * On supprime un indépendant grâce à son id
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

  const sql = db.prepare("DELETE FROM INDEPENDANT WHERE IDI = ?");
  const resultat = sql.run(params.id);

  if (resultat.changes === 0) {
    return new Response(JSON.stringify({ Erreur: "Independant not found" }), {
      status: 404,
    });
  }

  return Response.json({ Message: "Independant supprime" });
}
