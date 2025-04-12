/**
 * Utilitaires pour la manipulation de chaînes
 */

export * from "./string-utils"

// Ces fonctions devraient être dans leurs modules respectifs
// Déplacer getImageName vers string-utils.ts
// Déplacer getTypeBadgeColor vers theme-utils.ts

// Réexporter pour maintenir la compatibilité
export { getImageName } from "./string-utils"
export { getTypeBadgeColor } from "../theme/theme-utils"
