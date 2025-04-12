/**
 * Ce fichier est déprécié. Utilisez le module utils/type-check/index.ts à la place.
 * @deprecated
 */

// Réexporter depuis le nouveau module pour maintenir la compatibilité
export * from "./type-check/index"

// Avertissement de console en développement
if (process.env.NODE_ENV === "development") {
  console.warn("Avertissement: utils/type-check.ts est déprécié. Utilisez utils/type-check/index.ts à la place.")
}
