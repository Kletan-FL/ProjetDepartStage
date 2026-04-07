"use client";

import { useState } from "react";
import { updatePrestation } from "@/lib/actions/prestations";
import PrestationForm from "./PrestationForm";
import { Button } from "@/components/ui/button";
import type { Prestation } from "@/types/prestation";
import type { PrestationFormData } from "@/lib/schemas/prestationSchema";
import { Client } from "@/types/client";
import { Independant } from "@/types/independant";

export default function PrestationDetails({
  prestation,
  clients,
  independants,
}: {
  prestation: Prestation;
  clients: Client[];
  independants: Independant[];
}) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate(values: PrestationFormData) {
    await updatePrestation(prestation.IDP, values);
    setIsEditing(false);
  }

  return (
    <PrestationForm
      defaultValues={{
        IDC: prestation.IDC,
        IDI: prestation.IDI,
        INTITULE: prestation.INTITULE,
        DESCRIPTION: prestation.DESCRIPTION,
        DATE_DEBUT: prestation.DATE_DEBUT,
        DATE_FIN: prestation.DATE_FIN,
        TJM_FINAL: prestation.TJM_FINAL,
      }}
      isEditing={isEditing}
      onSubmit={handleUpdate}
      clients={clients}
      independants={independants}
      boutonModif={
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
