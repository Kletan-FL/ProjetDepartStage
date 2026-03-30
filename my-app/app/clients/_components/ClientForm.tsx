"use client";

/**
 * ! Utilisation de useState et useRouter : pas encore à l'aise dessus
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Client } from "@/types/client";

export default function ClientForm({
  data,
  mode,
}: {
  data?: Client;
  mode: "create" | "edit";
}) {
  const router = useRouter();

  const [nom, setNom] = useState(data?.NOM ?? "");
  const [siret, setSiret] = useState(data?.SIRET ?? "");
  const [ville, setVille] = useState(data?.VILLE ?? "");
  const [domaine, setDomaine] = useState(data?.DOMAINE ?? "");
  const [adresse, setAdresse] = useState(data?.ADRESSE ?? "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      NOM: nom,
      SIRET: siret,
      VILLE: ville,
      DOMAINE: domaine,
      ADRESSE: adresse,
    };

    if (mode === "create") {
      await fetch("/api/clients", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`/api/clients/${data!.IDC}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    router.push("/clients");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{mode === "create" ? "Créer un client" : "Modifier un client"}</h1>

      <p>
        <label>Nom :</label>
        <br />
        <input value={nom} onChange={(e) => setNom(e.target.value)} />
      </p>

      <p>
        <label>SIRET :</label>
        <br />
        <input value={siret} onChange={(e) => setSiret(e.target.value)} />
      </p>

      <p>
        <label>Ville :</label>
        <br />
        <input value={ville} onChange={(e) => setVille(e.target.value)} />
      </p>

      <p>
        <label>Domaine :</label>
        <br />
        <input value={domaine} onChange={(e) => setDomaine(e.target.value)} />
      </p>

      <p>
        <label>Adresse :</label>
        <br />
        <input value={adresse} onChange={(e) => setAdresse(e.target.value)} />
      </p>

      <button type="submit">
        {mode === "create" ? "Créer" : "Enregistrer"}
      </button>

      <button
        type="button"
        onClick={() => router.push("/clients")}
        style={{ marginLeft: "1rem" }}
      >
        Annuler
      </button>
    </form>
  );
}
