import { z } from "zod";

export const prestationSchema = z.object({
  IDC: z.number("Le client est obligatoire").int().positive(),
  IDI: z.number("L'indépendant est obligatoire").int().positive(),
  INTITULE: z.string().min(1, "L'intitulé est obligatoire"),
  DESCRIPTION: z.string().nullable().optional(),
  DATE_DEBUT: z.string().nullable().optional(),
  DATE_FIN: z.string().nullable().optional(),
  TJM_FINAL: z
    .number()
    .positive("Le TJM doit être positif")
    .nullable()
    .optional(),
});

export type PrestationFormData = z.infer<typeof prestationSchema>;
