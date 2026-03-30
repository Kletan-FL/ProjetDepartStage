import type { Client } from "@/types/client";
import Link from "next/link";

export default async function PageDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client: Client = await fetch(
    `http://localhost:3000/api/clients/${id}`,
    { cache: "no-store" },
  ).then((rep) => rep.json());

  // Placeholders si les champs sont absents
  const siret = client.SIRET || "Pas de SIRET";
  const ville = client.VILLE || "Pas de ville";
  const domaine = client.DOMAINE || "Pas de domaine";
  const adresse = client.ADRESSE || "Pas d’adresse";

  return (
    <div>
      <h1>Détails du client : {client.NOM}</h1>

      <p>
        <strong>SIRET :</strong> {siret}
      </p>
      <p>
        <strong>Ville :</strong> {ville}
      </p>
      <p>
        <strong>Domaine :</strong> {domaine}
      </p>
      <p>
        <strong>Adresse :</strong> {adresse}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <Link href={`/clients/${client.IDC}/edit`}>Modifier</Link>{" "}
        {/* On branchera la suppression plus tard */}
        <Link href="/clients">Retour à la liste</Link>
      </div>
    </div>
  );
}
