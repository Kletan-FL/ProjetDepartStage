/*
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import IndependantForm from "../components/IndependantForm";
import type { Independant } from "@/types/independant";
import type { IndependantFormData } from "@/lib/independantSchema";

import { Button } from "@/components/ui/button";

export default function IndependantDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [data, setData] = useState<Independant | null>(null);
  const [mode, setMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/independants/${id}`);
      const json = await res.json();
      setData(json);
    }
    load();
  }, [id]);

  if (!data) return <p>Chargement...</p>;

  const defaultValues: IndependantFormData = {
    NOM: data.NOM ?? "",
    PRENOM: data.PRENOM ?? "",
    EMAIL: data.EMAIL ?? "",
    TELEPHONE: data.TELEPHONE ?? "",
    TJM_SOUHAITE: data.TJM_SOUHAITE ?? 0,
  };

  async function handleEdit(values: IndependantFormData) {
    await fetch(`/api/independants/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });

    setMode("view");

    const res = await fetch(`/api/independants/${id}`);
    const json = await res.json();
    setData(json);
  }

  return (
    <IndependantForm
      defaultValues={defaultValues}
      mode={mode}
      onSubmit={handleEdit}
      boutonHeader={
        mode === "view" ? (
          <Button onClick={() => setMode("edit")}>Modifier</Button>
        ) : (
          <Button variant="outline" onClick={() => setMode("view")}>
            Annuler
          </Button>
        )
      }
    />
  );
}
*/

import IndependantForm from "../components/IndependantForm";
import { updateIndependant } from "../api";

export default async function IndependantDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  const data = await fetch(`http://localhost:3000/api/independants/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  const defaultValues = {
    NOM: data.NOM ?? "",
    PRENOM: data.PRENOM ?? "",
    EMAIL: data.EMAIL ?? "",
    TELEPHONE: data.TELEPHONE ?? "",
    TJM_SOUHAITE: data.TJM_SOUHAITE ?? 0,
  };

  return (
    <IndependantForm
      defaultValues={defaultValues}
      mode="view"
      onSubmit={(values) => updateIndependant(id, values)}
      boutonHeader={null}
    />
  );
}
