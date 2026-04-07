"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  prestationSchema,
  PrestationFormData,
} from "@/lib/schemas/prestationSchema";
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
import { DatePicker } from "@/components/ui/date-picker";
/* import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"; */
import { Client } from "@/types/client";
import { Independant } from "@/types/independant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PrestationForm({
  defaultValues,
  isEditing,
  onSubmit,
  boutonModif,
  title,
  clients,
  independants,
}: {
  defaultValues: PrestationFormData;
  isEditing: boolean;
  onSubmit: (values: PrestationFormData) => Promise<void>;
  boutonModif?: React.ReactNode;
  title?: string;
  clients: Client[];
  independants: Independant[];
}) {
  const form = useForm<PrestationFormData>({
    resolver: zodResolver(prestationSchema),
    defaultValues,
  });

  return (
    <Card className="w-full sm:max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {title ??
            (isEditing
              ? "Modifier une prestation"
              : "Détails de la prestation")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form id="prestation-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="INTITULE"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Intitulé</FieldLabel>
                  <Input
                    {...field}
                    disabled={!isEditing}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/*
            <Controller
              name="IDC"
              control={form.control}
              render={({ field }) => (
                <Combobox
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) =>
                    field.onChange(val ? Number(val) : null)
                  }
                  items={clients.map((c) => ({
                    value: String(c.IDC),
                    label: c.NOM,
                  }))}
                >
                  <ComboboxInput
                    placeholder="Sélectionner un client"
                    disabled={!isEditing}
                    value=""
                  >
                    <ComboboxValue>
                      {(value: string) => {
                        const client = clients.find(
                          (c) => String(c.IDC) === value,
                        );
                        return client ? client.NOM : "Sélectionner un client";
                      }}
                    </ComboboxValue>
                  </ComboboxInput>
                  <ComboboxContent>
                    <ComboboxEmpty>Aucun client trouvé.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item.value} value={item.value}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            /> */}

            <Controller
              name="IDC"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.IDC} value={String(c.IDC)}>
                        {c.NOM}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {/*
            <Controller
              name="IDI"
              control={form.control}
              render={({ field }) => (
                <Combobox
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) =>
                    field.onChange(val ? Number(val) : null)
                  }
                  items={independants.map((i) => ({
                    value: String(i.IDI),
                    label: `${i.NOM} ${i.PRENOM}`,
                  }))}
                >
                  <ComboboxInput
                    placeholder="Sélectionner un indépendant"
                    disabled={!isEditing}
                  >
                    <ComboboxValue>
                      {(value: string) => {
                        const independant = independants.find(
                          (i) => String(i.IDI) === value,
                        );
                        return independant
                          ? `${independant.NOM} ${independant.PRENOM}`
                          : "Sélectionner un indépendant";
                      }}
                    </ComboboxValue>
                  </ComboboxInput>
                  <ComboboxContent>
                    <ComboboxEmpty>Aucun indépendant trouvé.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item.value} value={item.value}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />
            */}

            <Controller
              name="IDI"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un indépendant" />
                  </SelectTrigger>
                  <SelectContent>
                    {independants.map((i) => (
                      <SelectItem key={i.IDI} value={String(i.IDI)}>
                        {i.NOM} {i.PRENOM}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="DESCRIPTION"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    disabled={!isEditing}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="DATE_DEBUT"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date de début</FieldLabel>
                  <DatePicker
                    value={field.value ?? null}
                    onChange={field.onChange}
                    disabled={!isEditing}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="DATE_FIN"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Date de fin</FieldLabel>
                  <DatePicker
                    value={field.value ?? null}
                    onChange={field.onChange}
                    disabled={!isEditing}
                    placeholder="Pas de date de fin"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="TJM_FINAL"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>TJM final (€)</FieldLabel>
                  <Input
                    type="number"
                    disabled={!isEditing}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    aria-invalid={fieldState.invalid}
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
            <Link href="/prestations">Retour à la liste</Link>
          </Button>

          {boutonModif}

          {isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          )}
          {isEditing && (
            <Button type="submit" form="prestation-form">
              Enregistrer
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
}
