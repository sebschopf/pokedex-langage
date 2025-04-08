// ce fichier contien des fonctions utilitaires dans l'application Next.js
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate une date en format lisible
 * @param dateString - La date à formater (ISO string)
 * @returns La date formatée en français
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)

  // Options pour le format de date français
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  return new Intl.DateTimeFormat("fr-FR", options).format(date)
}

export { getImageName } from "./get-image-name";
export { getTypeBadgeColor } from "./get-type-badge-color";
