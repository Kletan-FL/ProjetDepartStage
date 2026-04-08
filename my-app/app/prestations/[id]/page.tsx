/**
 * Page d'affichage des détails d'une prestation.
 */

import { notFound } from "next/navigation";
import { getPrestation } from "@/lib/actions/prestations";
import { getClients } from "@/lib/actions/clients";
import { getIndependants } from "@/lib/actions/independants";
import PrestationDetails from "../components/PrestationDetails";

export default async function PrestationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Récupération d'une prestation, des clients/indépendants depuis la base
  const [prestation, clients, independants] = await Promise.all([
    getPrestation(Number(id)),
    getClients(),
    getIndependants(),
  ]);

  // Si aucune prestation trouvée = page 404 automatique
  if (!prestation) notFound();

  /**
   * Affichage des détails via un composant dédié
   * On fournit la liste des clients/indépendants pour les menus déroulants
   */
  return (
    <PrestationDetails
      prestation={prestation}
      clients={clients}
      independants={independants}
    />
  );
}
