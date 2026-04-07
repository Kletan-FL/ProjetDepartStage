import {
  Clock,
  CheckCircle,
  Calendar,
  AlertCircle,
  LucideIcon,
} from "lucide-react";

/**
 * Structure décrivant l'affichage d'un statut de prestation :
 * - label : texte lisible par l'utilisateur
 * - variant : style visuel
 * - icon : icône associée (Lucide)
 */
type StatutLabel = {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
  icon: LucideIcon;
};

/**
 * Détermine le statut d'une prestation en fonction de ses dates.
 *
 * - Pas de date de début = prestation non planifiée
 * - Date de fin absente = prestation en cours
 * - Date de fin passée = prestation terminée
 * - Date de début future = prestation à venir
 * - Sinon = en cours
 *
 * ! Les dates sont comparées à la date actuelle.
 */
export function getStatut(dateDebut: string | null, dateFin: string | null) {
  const now = new Date();
  if (!dateDebut) return "non_planifiee";
  if (!dateFin) return "en_cours";
  if (new Date(dateFin) < now) return "terminee";
  if (new Date(dateDebut) > now) return "a_venir";
  return "en_cours";
}

/**
 * Dictionnaire associant chaque statut à son affichage.
 */
export const STATUT_LABELS: Record<string, StatutLabel> = {
  non_planifiee: {
    label: "Non planifiée",
    variant: "destructive",
    icon: AlertCircle,
  },
  en_cours: { label: "En cours", variant: "default", icon: Clock },
  terminee: { label: "Terminée", variant: "secondary", icon: CheckCircle },
  a_venir: { label: "À venir", variant: "outline", icon: Calendar },
};
