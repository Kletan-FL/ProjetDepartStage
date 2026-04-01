import Link from "next/link";
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
import { Client } from "@/types/client";

export default async function ClientsPage() {
  const clients = await fetch("http://localhost:3000/api/clients", {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Liste des clients</CardTitle>

          <Button asChild>
            <Link href="/clients/new">Créer un client</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold">Ville</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client: Client) => (
                <TableRow key={client.IDC}>
                  <TableCell className="font-medium">{client.NOM}</TableCell>

                  <TableCell>{client.VILLE}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/clients/${client.IDC}/edit`}>Modifier</Link>
                    </Button>

                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/clients/${client.IDC}`}>Voir détails</Link>
                    </Button>

                    <Button variant="destructive" size="sm">
                      Supprimer
                    </Button>
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
