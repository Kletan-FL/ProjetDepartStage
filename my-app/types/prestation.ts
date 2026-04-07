/**
 * Représente une prestation réalisée entre un client et un indépendant.
 *
 * ! Champs issus directement de la base de données.
 * - Les dates sont stockées sous forme de chaînes (YYYY-MM-DD).
 * - Certains champs peuvent être null lorsque l'information n'est pas fournie.
 */
export type Prestation = {
  /** Identifiant unique de la prestation */
  IDP: number;

  /** Identifiant du client associé à la prestation */
  IDC: number;

  /** Identifiant de l'indépendant réalisant la prestation */
  IDI: number;

  /** Intitulé de la prestation */
  INTITULE: string;

  /** Description détaillée de la prestation (optionnelle) */
  DESCRIPTION: string | null;

  /** Date de début de la prestation (optionnelle) */
  DATE_DEBUT: string | null;

  /** Date de fin de la prestation (optionnelle) */
  DATE_FIN: string | null;

  /** Taux journalier final appliqué (optionnel) */
  TJM_FINAL: number | null;
};

/**
 * Extension de Prestation incluant des informations supplémentaires permettant d'afficher :
 * - Nom du client
 * - Nom et prénom de l'indépendant
 *
 * * Utile pour l'interface utilisateur (listes, tableaux, etc)
 */
export type PrestationAvecNoms = Prestation & {
  /** Nom du client associé */
  NOM_CLIENT: string;

  /** Nom de l'indépendant */
  NOM_INDEPENDANT: string;

  /** Prénom de l'indépendant */
  PRENOM_INDEPENDANT: string;
};
