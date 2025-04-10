// lib/utils/index.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Fonction utilitaire pour les classes CSS (conservée ici car très utilisée)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Réexporter les autres fonctions utilitaires
export { formatDate } from "./format-date"
export { getImageName } from "./get-image-name"
export { getTypeBadgeColor } from "./get-type-badge-color"
