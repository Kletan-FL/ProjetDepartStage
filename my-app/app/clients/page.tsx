import Link from "next/link";
import type { Client } from "@/types/client";

export default async function PageClients() {
  const clients: Client[] = await fetch(
    "http://localhost:3000/api/clients",
    { cache: "no-store" }, // Ne pas utiliser le cache : potentiellement données obsolètes
  ).then((rep) => rep.json());

  return (
    <div>
      <h1>Liste des clients</h1>

      <p>
        <Link href="/clients/new">Créer un nouveau client</Link>
      </p>

      <ol>
        {clients.map((c) => (
          <li key={c.IDC}>
            {c.NOM} <Link href={`/clients/${c.IDC}`}>Détails</Link>{" "}
            <Link href={`/clients/${c.IDC}/edit`}>Modifier</Link>{" "}
            {/* //TODO Suppression */}
          </li>
        ))}
      </ol>
    </div>
  );
}
