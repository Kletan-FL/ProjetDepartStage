import Link from "next/link";
import { getIndependants } from "@/lib/actions/independants";
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

export default async function IndependantsPage() {
  const independants = await getIndependants(); // ← accès DB direct, pas de fetch

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
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {independants.map((independant) => (
                <TableRow key={independant.IDI}>
                  <TableCell>{independant.NOM}</TableCell>
                  <TableCell>{independant.PRENOM}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/independants/${independant.IDI}`}>
                        Voir détails
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm" type="submit">
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
