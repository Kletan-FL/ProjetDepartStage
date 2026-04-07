/**
 * Formulaire générique utilisé pour créer ou modifier un client.
 */

"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientSchema, ClientFormData } from "@/lib/schemas/clientSchema";

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

export default function ClientForm({
  defaultValues,
  isEditing,
  onSubmit,
  boutonModif,
  title,
}: {
  defaultValues: ClientFormData;
  isEditing: boolean;
  onSubmit: (values: ClientFormData) => Promise<void>;
  boutonModif?: React.ReactNode;
  title?: string;
}) {
  // Initialisation du formulaire avec validation Zod
  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  return (
    <Card className="w-full sm:max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {/* Titre dynamique selon le mode */}
          {title ?? (isEditing ? "Modifier un client" : "Détails du client")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Formulaire identifié pour permettre un bouton submit externe */}
        <form id="client-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Chaque champ utilise Controller */}
            <Controller
              name="NOM"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nom</FieldLabel>
                  {/* Champ désactivé si on n'est pas en mode édition */}
                  <Input
                    {...field}
                    disabled={!isEditing}
                    placeholder="Nom de l'entreprise"
                    aria-invalid={fieldState.invalid}
                  />

                  {/* Affichage des erreurs Zod */}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                    onChange={(e) => field.onChange(e.target.value || "")}
                    className="border rounded px-2 py-1"
                    aria-invalid={fieldState.invalid}
                  >
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

                  {/* Zone de texte stylisée via InputGroup (plus de lignes)*/}
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      disabled={!isEditing}
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
          {/* Bouton de retour */}
          <Button variant="outline" asChild>
            <Link href="/clients">Retour à la liste</Link>
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
            <Button type="submit" form="client-form">
              Enregistrer
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
