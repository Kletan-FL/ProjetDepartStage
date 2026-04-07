import { createPrestation } from "@/lib/actions/prestations";
import PrestationForm from "../components/PrestationForm";
import { getClients } from "@/lib/actions/clients";
import { getIndependants } from "@/lib/actions/independants";

export default async function NewPrestationPage() {
  const clients = await getClients();
  const independants = await getIndependants();

  return (
    <PrestationForm
      defaultValues={{
        IDC: 0,
        IDI: 0,
        INTITULE: "",
        DESCRIPTION: null,
        DATE_DEBUT: null,
        DATE_FIN: null,
        TJM_FINAL: null,
      }}
      isEditing={true}
      title="Créer une prestation"
      onSubmit={createPrestation}
      clients={clients}
      independants={independants}
    />
  );
}
