/**
 * Page permettant de créer une nouvelle prestation.
 */

import { createPrestation } from "@/lib/actions/prestations";
import PrestationForm from "../components/PrestationForm";
import { getClients } from "@/lib/actions/clients";
import { getIndependants } from "@/lib/actions/independants";

export default async function NewPrestationPage() {
  const clients = await getClients();
  const independants = await getIndependants();

  return (
    <PrestationForm
      // Valeurs initiales du formulaire
      defaultValues={{
        IDC: 0,
        IDI: 0,
        INTITULE: "",
        DESCRIPTION: null,
        DATE_DEBUT: null,
        DATE_FIN: null,
        TJM_FINAL: null,
      }}
      // Indique au formulaire qu'il s'agit d'une création/modification
      isEditing={true}
      // Titre affiché en haut du formulaire
      title="Créer une prestation"
      // Fonction appelée lors de la soumission
      onSubmit={createPrestation}
      // Listes des clients/indépendants pour menu déroulant
      clients={clients}
      independants={independants}
    />
  );
}
