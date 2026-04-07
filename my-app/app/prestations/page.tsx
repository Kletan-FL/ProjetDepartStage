import Link from "next/link";
import { getPrestations } from "@/lib/actions/prestations";
import { getStatut, STATUT_LABELS } from "@/lib/utils/prestationStatut";
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
import { PrestationAvecNoms } from "@/types/prestation";
import { Badge } from "@/components/ui/badge";

export default async function PrestationsPage() {
  const prestations = (await getPrestations()) as PrestationAvecNoms[];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Liste des prestations</CardTitle>
          <Button asChild>
            <Link href="/prestations/new">Créer une prestation</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intitulé</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Indépendant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prestations.map((p) => {
                const statut = getStatut(p.DATE_DEBUT, p.DATE_FIN);
                const { label, variant, icon } = STATUT_LABELS[statut];
                return (
                  <TableRow key={p.IDP}>
                    <TableCell className="font-medium">{p.INTITULE}</TableCell>
                    <TableCell>{p.NOM_CLIENT}</TableCell>
                    <TableCell>
                      {p.NOM_INDEPENDANT} {p.PRENOM_INDEPENDANT}
                    </TableCell>
                    <TableCell>
                      <Badge variant={variant} icon={icon}>
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/prestations/${p.IDP}`}>Voir détails</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
