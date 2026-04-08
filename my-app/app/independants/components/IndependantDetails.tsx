/**
 * Composant affichant les détails d’un indépendant avec possibilité de modification.
 */

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
  // Gère l'état du formulaire : affichage ou édition
  const [isEditing, setIsEditing] = useState(false);

  // Valeurs initiales du formulaire
  const defaultValues: IndependantFormData = {
    NOM: independant.NOM,
    PRENOM: independant.PRENOM,
    EMAIL: independant.EMAIL,
    TELEPHONE: independant.TELEPHONE,
    TJM_SOUHAITE: independant.TJM_SOUHAITE,
  };

  // Fonction appelée lors de la soumission du formulaire
  async function handleUpdate(values: IndependantFormData) {
    await updateIndependant(independant.IDI, values);
    setIsEditing(false); // Retour au mode lecture après mise à jour
  }

  return (
    <IndependantForm
      defaultValues={defaultValues}
      isEditing={isEditing}
      onSubmit={handleUpdate}
      boutonModif={
        isEditing ? (
          // Bouton affiché en mode édition = permet d'annuler les modifications
          <Button variant="destructive" onClick={() => setIsEditing(false)}>
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
