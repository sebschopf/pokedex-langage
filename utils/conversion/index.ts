/**
 * Point d'entrée pour les fonctions de conversion
 */

// Réexporter toutes les fonctions de conversion de type
export {
  toNumber,
  toNumberOrNull,
  toString,
  toStringOrNull,
  toBoolean,
  toBooleanOrNull,
  toArray,
  toArrayOrNull,
} from "./type-conversion"

// Réexporter les fonctions de gestion de null et undefined
export {
  nullToUndefined,
  undefinedToNull,
  nullToDefault,
} from "./null-undefined"
