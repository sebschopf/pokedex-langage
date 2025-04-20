/**
 * Point d'entrée principal pour les utilitaires
 * Exporte toutes les fonctions utilitaires de manière organisée
 */

// Importations des modules
import * as ConversionUtils from "./conversion"
import * as DateUtils from "./date"
import * as ImageUtils from "./image"
import * as PaginationUtils from "./pagination"
import * as SecurityUtils from "./security"
import * as SlugUtils from "./slugs"
import * as StringUtils from "./string"
import * as StorageUtils from "./storage"
import * as SupabaseUtils from "./supabase"
import * as ThemeUtils from "./theme"
import * as TypeCheckUtils from "./type-check"
import * as ValidationUtils from "./validation"

// Exportation des modules sous forme de namespaces
export {
  ConversionUtils,
  DateUtils,
  ImageUtils,
  PaginationUtils,
  SecurityUtils,
  SlugUtils,
  StringUtils,
  StorageUtils,
  SupabaseUtils,
  ThemeUtils,
  TypeCheckUtils,
  ValidationUtils,
}

// Exportation directe des fonctions couramment utilisées
export { cn } from "./theme"
export { getTypeBadgeColor } from "./theme"
export { getImageName } from "./image"
export { generateSlug, generateLanguageSlug } from "./slugs"
export { toNumber, toString, toBoolean } from "./conversion"
export { formatDate, formatDateFr } from "./date"
export { isNullOrUndefined, isEmptyString, isNullOrEmpty } from "./validation"
export { isNumber, isString, isBoolean, isObject, isArray } from "./type-check"

// Exportation des modules entiers
export * from "./conversion"
export * from "./date"
export * from "./image"
export * from "./pagination"
export * from "./security"
export * from "./slugs"
export * from "./string"
export * from "./storage"
export * from "./supabase"
export * from "./theme"
export * from "./type-check"
export * from "./validation"
