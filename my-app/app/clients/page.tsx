/**
 * Page listant l'ensemble des clients enregistrés.
 */

import Link from "next/link";
import { getClients } from "@/lib/actions/clients";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteClientButton from "./components/DeleteClientButton";

export default async function ClientsPage() {
  // Récupération des clients depuis la base
  const clients = await getClients();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Liste des clients</CardTitle>

          {/* Bouton utilisant `asChild` pour transformer le bouton en lien */}
          <Button asChild>
            <Link href="/clients/new">Créer un client</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.IDC}>
                  <TableCell>{client.NOM}</TableCell>
                  <TableCell>{client.VILLE}</TableCell>

                  <TableCell className="space-x-2">
                    {/* Bouton de navigation vers la page de détails */}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/clients/${client.IDC}`}>Voir détails</Link>
                    </Button>

                    {/* Composant isolé gérant la suppression */}
                    <DeleteClientButton clientId={client.IDC} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
