/**
 * Page d'affichage des détails d'un client.
 */

import { notFound } from "next/navigation";
import { getClient } from "@/lib/actions/clients";
import ClientDetails from "../components/ClientDetails";

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Récupération du client depuis la base
  const client = await getClient(Number(id));

  // Si aucun client trouvé = page 404 automatique
  if (!client) notFound();

  // Affichage des détails via un composant dédié
  return <ClientDetails client={client} />;
}
