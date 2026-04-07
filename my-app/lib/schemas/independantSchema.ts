import { z } from "zod";

/**
 * Schéma de validation pour la création ou la modification d'un travailleur indépendant.
 */
export const independantSchema = z.object({
  /** Nom de famille (obligatoire) */
  NOM: z.string().min(1, "Le nom est obligatoire"),

  /** Prénom (obligatoire) */
  PRENOM: z.string().min(1, "Le prénom est obligatoire"),

  /** Adresse email valide */
  EMAIL: z.email("Adresse email invalide"),

  /**
   * Numéro de téléphone professionnel (obligatoire).
   * Doit contenir exactement 10 chiffres.
   */
  TELEPHONE: z
    .string()
    .regex(/^\d{10}$/, "Le numéro doit contenir 10 chiffres"),

  /**
   * Taux Journalier Moyen souhaité.
   * Doit être un nombre strictement positif.
   */
  TJM_SOUHAITE: z.number().positive("Le TJM doit être un nombre positif"),
});

/** Type dérivé du schéma pour typer les formulaires */
export type IndependantFormData = z.infer<typeof independantSchema>;
