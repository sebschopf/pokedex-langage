/**
 * Point d'entrée pour toutes les fonctions utilitaires
 * Ces fonctions peuvent être utilisées côté client et serveur
 */

// Utilitaires CSS
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fonction utilitaire pour combiner des classes CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilitaires de formatage
export { formatDate } from "./formatting/format-date"
export { getImageName } from "./formatting/get-image-name"
export { getTypeBadgeColor } from "./formatting/get-type-badge-color"
export * from "./security/security-logger"
