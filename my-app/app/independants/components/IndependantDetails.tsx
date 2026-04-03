// Client Component qui gère le mode entre View et Update

"use client";

import { useState } from "react";
import { updateIndependant } from "@/lib/actions/independants";
import IndependantForm from "./IndependantForm";
import { Button } from "@/components/ui/button";
import type { Independant } from "@/types/independant";
import type { IndependantFormData } from "@/lib/schemas/independantSchema";

export default function IndependantDetails({
  independant,
}: {
  independant: Independant;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues: IndependantFormData = {
    NOM: independant.NOM,
    PRENOM: independant.PRENOM,
    EMAIL: independant.EMAIL,
    TELEPHONE: independant.TELEPHONE,
    TJM_SOUHAITE: independant.TJM_SOUHAITE,
  };

  async function handleUpdate(values: IndependantFormData) {
    await updateIndependant(independant.IDI, values);
    setIsEditing(false);
  }

  return (
    <IndependantForm
      defaultValues={defaultValues}
      isEditing={isEditing}
      onSubmit={handleUpdate}
      boutonHeader={
        isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Modifier</Button>
        )
      }
    />
  );
}
