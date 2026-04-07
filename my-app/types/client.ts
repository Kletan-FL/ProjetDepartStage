/**
 * Représente un client pour lequel des prestations peuvent être réalisées.
 *
 * ! Champs issus directement de la base de données.
 */
export type Client = {
  /** Identifiant unique du client */
  IDC: number;

  /** Nom de l'entreprise cliente */
  NOM: string;

  /** Numéro SIRET de l'entreprise */
  SIRET: string;

  /** Ville où se situe l'entreprise */
  VILLE: string;

  /** Domaine d'activité principal du client */
  DOMAINE: "Informatique" | "Finance" | "Marketing" | "RH";

  /** Adresse postale complète du client */
  ADRESSE: string;
};
