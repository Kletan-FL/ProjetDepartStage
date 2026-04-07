/**
 * Page permettant de créer un nouveau client.
 */

import ClientForm from "../components/ClientForm";
import { createClient } from "@/lib/actions/clients";

export default function NewClientPage() {
  return (
    <ClientForm
      // Valeurs initiales du formulaire (tous les champs vides)
      defaultValues={{
        NOM: "",
        SIRET: "",
        VILLE: "",
        DOMAINE: "Informatique",
        ADRESSE: "",
      }}
      // Indique au formulaire qu'il s'agit d'une création et non d'une édition
      isEditing={false}
      // Titre affiché en haut du formulaire
      title="Créer un client"
      // Fonction appelée lors de la soumission
      onSubmit={createClient}
    />
  );
}
