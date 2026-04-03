import IndependantForm from "../components/IndependantForm";
import { createIndependant } from "@/lib/actions/independants";

export default function NewIndependantPage() {
  return (
    <IndependantForm
      defaultValues={{
        NOM: "",
        PRENOM: "",
        EMAIL: "",
        TELEPHONE: "",
        TJM_SOUHAITE: 0,
      }}
      isEditing={true}
      title="Créer un indépendant"
      onSubmit={createIndependant}
    />
  );
}
