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
import { Independant } from "@/types/independant";

export default async function IndependantsPage() {
  const independants = await fetch("http://localhost:3000/api/independants", {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Liste des indépendants</CardTitle>

          <Button asChild>
            <Link href="/independants/new">Créer un indépendant</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold">Prénom</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {independants.map((independant: Independant) => (
                <TableRow key={independant.IDI}>
                  <TableCell className="font-medium">
                    {independant.NOM}
                  </TableCell>

                  <TableCell>{independant.PRENOM}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/independants/${independant.IDI}`}>
                        Voir détails
                      </Link>
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
