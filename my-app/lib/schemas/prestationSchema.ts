import { z } from "zod";

/**
 * Schéma de validation pour la création ou la modification d'une prestation.
 */
export const prestationSchema = z.object({
  /**
   * Identifiant du client (obligatoire).
   * Doit être un entier positif.
   */
  IDC: z.number("Le client est obligatoire").int().positive(),

  /**
   * Identifiant de l'indépendant (obligatoire).
   * Doit être un entier positif.
   */
  IDI: z.number("L'indépendant est obligatoire").int().positive(),

  /** Intitulé de la prestation (obligatoire) */
  INTITULE: z.string().min(1, "L'intitulé est obligatoire"),

  /** Description optionnelle de la prestation */
  DESCRIPTION: z.string().nullable().optional(),

  /** Date de début (optionnelle, string) */
  DATE_DEBUT: z.string().nullable().optional(),

  /** Date de fin (optionnelle, string) */
  DATE_FIN: z.string().nullable().optional(),

  /**
   * Taux Journalier Moyen final appliqué.
   * Doit être positif si fourni.
   */
  TJM_FINAL: z
    .number()
    .positive("Le TJM doit être positif")
    .nullable()
    .optional(),
});

/** Type dérivé du schéma pour typer les formulaires */
export type PrestationFormData = z.infer<typeof prestationSchema>;
