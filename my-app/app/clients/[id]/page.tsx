import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await fetch(`http://localhost:3000/api/clients/${id}`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{client.NOM}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Field>
            <FieldLabel className="font-semibold">SIRET</FieldLabel>
            <p>{client.SIRET}</p>
          </Field>

          <Separator className="my-4" />

          <Field>
            <FieldLabel className="font-semibold">Ville</FieldLabel>
            <p>{client.VILLE}</p>
          </Field>

          <Separator />

          <Field>
            <FieldLabel className="font-semibold">Domaine</FieldLabel>
            <p>{client.DOMAINE}</p>
          </Field>

          <Separator />

          <Field>
            <FieldLabel className="font-semibold">Adresse</FieldLabel>
            <p>{client.ADRESSE}</p>
          </Field>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/clients">Retour à la liste</Link>
            </Button>

            <Button asChild>
              <Link href={`/clients/${client.IDC}/edit`}>Modifier</Link>
            </Button>

            <Button variant="destructive">Supprimer</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
