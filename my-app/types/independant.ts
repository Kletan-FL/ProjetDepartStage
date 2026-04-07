/**
 * Représente un travailleur indépendant.
 *
 * ! Champs issus directement de la base de données.
 */
export type Independant = {
  /** Identifiant unique de l'indépendant */
  IDI: number;

  /** Nom de famille de l'indépendant */
  NOM: string;

  /** Prénom de l'indépendant */
  PRENOM: string;

  /** Adresse email professionnelle */
  EMAIL: string;

  /** Numéro de téléphone professionnel */
  TELEPHONE: string;

  /** Taux Journalier Moyen souhaité par l'indépendant */
  TJM_SOUHAITE: number;
};
