/**
 * Ce fichier est déprécié. Utilisez le module utils/slug/slug-generator.ts à la place.
 * @deprecated
 */

// Réexporter depuis le nouveau module pour maintenir la compatibilité
export * from "../../utils/slug/slug-generator"

// Avertissement de console en développement
if (process.env.NODE_ENV === "development") {
  console.warn(
    "Avertissement: lib/utils/slug-generator.ts est déprécié. Utilisez utils/slug/slug-generator.ts à la place.",
  )
}
