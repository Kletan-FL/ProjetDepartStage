"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientSchema, ClientFormData } from "@/lib/schemas/clientSchema";
import type { Client } from "@/types/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClientForm({
  data,
  mode,
}: {
  data?: Client;
  mode: "create" | "edit";
}) {
  const router = useRouter();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      NOM: data?.NOM ?? "",
      SIRET: data?.SIRET ?? "",
      VILLE: data?.VILLE ?? "",
      DOMAINE: data?.DOMAINE ?? undefined,
      ADRESSE: data?.ADRESSE ?? "",
    },
  });

  async function onSubmit(values: ClientFormData) {
    if (mode === "create") {
      await fetch("/api/clients", {
        method: "POST",
        body: JSON.stringify(values),
      });
    } else {
      await fetch(`/api/clients/${data!.IDC}`, {
        method: "PUT",
        body: JSON.stringify(values),
      });
    }

    router.push("/clients");
  }

  return (
    <Card className="w-full sm:max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Créer un client" : "Modifier un client"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form id="client-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="NOM"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nom</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Nom de l'entreprise"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="SIRET"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>SIRET</FieldLabel>
                  <Input
                    {...field}
                    placeholder="12345678900000"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="VILLE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Ville</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Nom de la ville"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="DOMAINE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Domaine</FieldLabel>

                  <select
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || undefined)
                    }
                    className="border rounded px-2 py-1"
                    aria-invalid={fieldState.invalid}
                  >
                    <option value="">Choisir un domaine</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="RH">RH</option>
                  </select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="ADRESSE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Adresse</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      placeholder="1 Rue Nomderue"
                      rows={3}
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button variant="outline" asChild>
            <Link href="/clients">Retour à la liste</Link>
          </Button>

          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>

          <Button type="submit" form="client-form">
            {mode === "create" ? "Créer" : "Enregistrer"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
