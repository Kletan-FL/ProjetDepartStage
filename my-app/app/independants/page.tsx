/**
 * Page listant l'ensemble des indépendants enregistrés.
 */

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
import DeleteIndependantButton from "./components/DeleteIndependantButton";

export default async function IndependantsPage() {
  // Récupération des indépendants depuis la base
  const independants = await getIndependants();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Liste des indépendants</CardTitle>
          {/* Bouton asChild pour transformer le bouton en lien */}
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
                    {/* Bouton de navigation vers la page de détails */}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/independants/${independant.IDI}`}>
                        Voir détails
                      </Link>
                    </Button>

                    {/* Component gérant la suppression */}
                    <DeleteIndependantButton independantId={independant.IDI} />
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
