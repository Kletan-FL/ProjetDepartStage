import ClientForm from "../../_components/ClientForm";
import type { Client } from "@/types/client";

export default async function PageEditClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client: Client = await fetch(
    `http://localhost:3000/api/clients/${id}`,
    { cache: "no-store" }, // Ne pas utiliser le cache : potentiellement données obsolètes
  ).then((rep) => rep.json());

  return <ClientForm mode="edit" data={client} />;
}
