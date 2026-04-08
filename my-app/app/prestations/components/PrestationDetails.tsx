/**
 * Composant affichant les détails d’un client avec possibilité de modification.
 */

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
  // Gère l'état du formulaire : affichage ou édition
  const [isEditing, setIsEditing] = useState(false);

  // Valeurs initiales du formulaire
  const defaultValues: PrestationFormData = {
    IDC: prestation.IDC,
    IDI: prestation.IDI,
    INTITULE: prestation.INTITULE,
    DESCRIPTION: prestation.DESCRIPTION,
    DATE_DEBUT: prestation.DATE_DEBUT,
    DATE_FIN: prestation.DATE_FIN,
    TJM_FINAL: prestation.TJM_FINAL,
  };

  // Fonction appelée lors de la soumission du formulaire
  async function handleUpdate(values: PrestationFormData) {
    await updatePrestation(prestation.IDP, values);
    setIsEditing(false); // Retour au mode lecture après mise à jour
  }

  return (
    <PrestationForm
      defaultValues={defaultValues}
      isEditing={isEditing}
      onSubmit={handleUpdate}
      clients={clients}
      independants={independants}
      boutonModif={
        isEditing ? (
          // Bouton affiché en mode édition = permet d'annuler les modifications
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
        ) : (
          // Bouton affiché en mode lecture = active le mode édition
          <Button onClick={() => setIsEditing(true)}>Modifier</Button>
        )
      }
    />
  );
}
