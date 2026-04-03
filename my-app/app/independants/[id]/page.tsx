import { notFound } from "next/navigation";
import { getIndependant } from "@/lib/actions/independants";
import IndependantDetails from "../components/IndependantDetails";

export default async function IndependantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const independant = await getIndependant(Number(id));

  if (!independant) notFound();

  return <IndependantDetails independant={independant} />;
}
