"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  independantSchema,
  IndependantFormData,
} from "@/lib/independantSchema";

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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IndependantForm({
  defaultValues,
  mode,
  onSubmit,
  boutonHeader,
}: {
  defaultValues: IndependantFormData;
  mode: "create" | "edit" | "view";
  onSubmit: (values: IndependantFormData) => Promise<void>;
  boutonHeader?: React.ReactNode;
}) {
  const form = useForm<IndependantFormData>({
    resolver: zodResolver(independantSchema),
    defaultValues,
  });

  const disabled = mode === "view";

  return (
    <Card className="w-full sm:max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {mode === "create"
            ? "Créer un indépendant"
            : mode === "edit"
              ? "Modifier un indépendant"
              : "Détails de l'indépendant"}
        </CardTitle>
      </CardHeader>

      {boutonHeader}

      <CardContent>
        <form id="independant-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="NOM"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nom</FieldLabel>
                  <Input
                    {...field}
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="PRENOM"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Prénom</FieldLabel>
                  <Input
                    {...field}
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="EMAIL"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="TELEPHONE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Téléphone</FieldLabel>
                  <Input
                    {...field}
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="TJM_SOUHAITE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>TJM souhaité (€)</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    disabled={disabled}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
            <Link href="/independants">Retour à la liste</Link>
          </Button>

          {mode !== "view" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          )}

          {mode !== "view" && (
            <Button type="submit" form="independant-form">
              {mode === "create" ? "Créer" : "Enregistrer"}
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
