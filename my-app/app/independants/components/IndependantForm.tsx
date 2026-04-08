/**
 * Formulaire générique utilisé pour créer ou modifier un indépendant.
 */

"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  independantSchema,
  IndependantFormData,
} from "@/lib/schemas/independantSchema";
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
  isEditing,
  onSubmit,
  boutonModif,
  title,
}: {
  defaultValues: IndependantFormData;
  isEditing: boolean;
  onSubmit: (values: IndependantFormData) => Promise<void>;
  boutonModif?: React.ReactNode;
  title?: string;
}) {
  // Initialisation du formulaire avec validation Zod
  const form = useForm<IndependantFormData>({
    resolver: zodResolver(independantSchema),
    defaultValues,
  });

  return (
    <Card className="w-full sm:max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {/* Titre dynamique selon le mode */}
          {title ??
            (isEditing
              ? "Modifier un indépendant"
              : "Détails de l'indépendant")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Formulaire identifié pour permettre bouton submit externe */}
        <form id="independant-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Chaque champ utilise Controller 
            Ici on tente de ne pas dupliquer le code car les champs sont très similaires
            */}
            {(["NOM", "PRENOM", "EMAIL", "TELEPHONE"] as const).map(
              (fieldName) => (
                <Controller
                  key={fieldName}
                  name={fieldName}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        {fieldName.charAt(0) + fieldName.slice(1).toLowerCase()}
                      </FieldLabel>
                      {/* Champ désactivé si on n'est pas en mode édition */}
                      <Input
                        {...field}
                        disabled={!isEditing}
                        aria-invalid={fieldState.invalid}
                      />

                      {/* Affichage des erreurs Zod */}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ),
            )}

            <Controller
              name="TJM_SOUHAITE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>TJM souhaité (€)</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    disabled={!isEditing}
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
          {/* Bouton de retour */}
          <Button variant="outline" asChild>
            <Link href="/independants">Retour à la liste</Link>
          </Button>

          {/* Bouton de modification fourni par le parent */}
          {boutonModif}

          {/* Bouton Reset visible uniquement en mode édition */}
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          )}

          {/* Bouton d’enregistrement lié au formulaire */}
          {isEditing && (
            <Button type="submit" form="independant-form">
              Enregistrer
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
