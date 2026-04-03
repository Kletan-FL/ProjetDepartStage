import { z } from "zod";

export const independantSchema = z.object({
  NOM: z.string().min(1, "Le nom est obligatoire"),
  PRENOM: z.string().min(1, "Le prénom est obligatoire"),
  EMAIL: z.email("Adresse email invalide"),
  TELEPHONE: z
    .string()
    .regex(/^\d{10}$/, "Le numéro doit contenir 10 chiffres"),
  TJM_SOUHAITE: z.number().positive("Le TJM doit être un nombre positif"),
});

export type IndependantFormData = z.infer<typeof independantSchema>;
