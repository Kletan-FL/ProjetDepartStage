import { z } from "zod";

export const clientSchema = z.object({
  NOM: z.string().min(1, "Le nom est obligatoire"),
  SIRET: z
    .string()
    .length(14, "Le SIRET doit faire 14 caractères")
    .regex(/^\d+$/, "Le SIRET doit contenir uniquement des chiffres"),
  VILLE: z.string().min(1, "La ville est obligatoire"),
  DOMAINE: z.string().min(1, "Le domaine est obligatoire"),
  ADRESSE: z.string().min(1, "L’adresse est obligatoire"),
});

export type ClientFormData = z.infer<typeof clientSchema>;
