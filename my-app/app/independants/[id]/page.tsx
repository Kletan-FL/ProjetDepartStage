/**
 * Page d'affichage des détails d'un indépendant.
 */

import { notFound } from "next/navigation";
import { getIndependant } from "@/lib/actions/independants";
import IndependantDetails from "../components/IndependantDetails";

export default async function IndependantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Récupération du client depuis la base
  const independant = await getIndependant(Number(id));

  // Si aucun client trouvé = page 404 automatique
  if (!independant) notFound();

  // Affichage des détails via un composant dédié
  return <IndependantDetails independant={independant} />;
}
