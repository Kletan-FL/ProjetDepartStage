/**
 * Composant affichant les détails d’un client avec possibilité d’édition.
 */

"use client";

import { useState } from "react";
import { updateClient } from "@/lib/actions/clients";
import ClientForm from "./ClientForm";
import { Button } from "@/components/ui/button";
import type { Client } from "@/types/client";
import type { ClientFormData } from "@/lib/schemas/clientSchema";

export default function IndependantDetails({ client }: { client: Client }) {
  // Gère l'état du formulaire : affichage ou édition
  const [isEditing, setIsEditing] = useState(false);

  // Valeurs initiales du formulaire
  const defaultValues: ClientFormData = {
    NOM: client.NOM,
    SIRET: client.SIRET,
    VILLE: client.VILLE,
    DOMAINE: client.DOMAINE,
    ADRESSE: client.ADRESSE,
  };

  // Fonction appelée lors de la soumission du formulaire
  async function handleUpdate(values: ClientFormData) {
    await updateClient(client.IDC, values);
    setIsEditing(false); // Retour au mode lecture après mise à jour
  }

  return (
    <ClientForm
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
