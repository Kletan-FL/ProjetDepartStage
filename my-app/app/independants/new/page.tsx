/**
 * Page permettant de créer un nouvel indépendant.
 */

import IndependantForm from "../components/IndependantForm";
import { createIndependant } from "@/lib/actions/independants";

export default function NewIndependantPage() {
  return (
    <IndependantForm
      // Valeurs initiales du formulaire
      defaultValues={{
        NOM: "",
        PRENOM: "",
        EMAIL: "",
        TELEPHONE: "",
        TJM_SOUHAITE: 0,
      }}
      // Indique au formulaire qu'il s'agit d'une création/modification
      isEditing={true}
      // Titre affiché en haut du formulaire
      title="Créer un indépendant"
      // Fonction appelée lors de la soumission
      onSubmit={createIndependant}
    />
  );
}
