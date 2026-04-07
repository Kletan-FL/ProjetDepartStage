import { z } from "zod";

/**
 * Schéma de validation pour la création ou la modification d'un client.
 */
export const clientSchema = z.object({
  /** Nom de l'entreprise cliente (obligatoire) */
  NOM: z.string().min(1, "Le nom est obligatoire"),

  /**
   * Numéro SIRET de l'entreprise (obligatoire).
   * - Doit contenir exactement 14 caractères.
   * - Doit être composé uniquement de chiffres.
   */
  SIRET: z
    .string()
    .length(14, "Le SIRET doit faire 14 caractères")
    .regex(/^\d+$/, "Le SIRET doit contenir uniquement des chiffres"),

  /** Ville où se situe l'entreprise (obligatoire) */
  VILLE: z.string().min(1, "La ville est obligatoire"),

  /** Domaine d'activité du client */
  DOMAINE: z.enum(["Informatique", "Finance", "Marketing", "RH"]),

  /** Adresse postale complète (obligatoire) */
  ADRESSE: z.string().min(1, "L’adresse est obligatoire"),
});

/** Type dérivé du schéma pour typer les formulaires */
export type ClientFormData = z.infer<typeof clientSchema>;
