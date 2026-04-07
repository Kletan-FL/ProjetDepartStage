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

  const [prestation, clients, independants] = await Promise.all([
    getPrestation(Number(id)),
    getClients(),
    getIndependants(),
  ]);

  if (!prestation) notFound();

  return (
    <PrestationDetails
      prestation={prestation}
      clients={clients}
      independants={independants}
    />
  );
}
