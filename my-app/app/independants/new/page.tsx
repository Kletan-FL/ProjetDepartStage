"use client";

import { useRouter } from "next/navigation";
import IndependantForm from "../components/IndependantForm";
import type { IndependantFormData } from "@/lib/independantSchema";

export default function NewIndependantPage() {
  const router = useRouter();

  const defaultValues: IndependantFormData = {
    NOM: "",
    PRENOM: "",
    EMAIL: "",
    TELEPHONE: "",
    TJM_SOUHAITE: 0,
  };

  async function handleCreate(values: IndependantFormData) {
    await fetch("/api/independants", {
      method: "POST",
      body: JSON.stringify(values),
    });

    router.push("/independants");
  }

  return (
    <IndependantForm
      defaultValues={defaultValues}
      mode="create"
      onSubmit={handleCreate}
    />
  );
}
