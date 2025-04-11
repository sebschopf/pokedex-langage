import type { DbLibrary } from "@/types/database"
import type { Library } from "@/types/models"
import { toNumber, toString } from "@/utils/conversion/type-conversion"

/**
 * Convertit un objet DbLibrary en Library
 * @param dbLibrary Objet de la base de données
 * @returns Objet Library pour l'application
 */
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: toNumber(dbLibrary.id),
    bestFor: dbLibrary.best_for, // Déjà null, pas besoin de conversion
    createdAt: dbLibrary.created_at, // Déjà null, pas besoin de conversion
    description: dbLibrary.description, // Déjà null, pas besoin de conversion
    documentationUrl: dbLibrary.documentation_url, // Déjà null, pas besoin de conversion
    features: dbLibrary.features, // Déjà null, pas besoin de conversion
    githubUrl: dbLibrary.github_url, // Déjà null, pas besoin de conversion
    isOpenSource: dbLibrary.is_open_source, // Déjà null, pas besoin de conversion
    languageId: toNumber(dbLibrary.language_id),
    logoPath: dbLibrary.logo_path, // Déjà null, pas besoin de conversion
    name: toString(dbLibrary.name),
    officialWebsite: dbLibrary.official_website, // Déjà null, pas besoin de conversion
    popularity: toNumber(dbLibrary.popularity),
    subtype: dbLibrary.sub_type, // Déjà null, pas besoin de conversion
    technologyType: dbLibrary.technology_type, // Déjà null, pas besoin de conversion
    uniqueSellingPoint: dbLibrary.unique_selling_point, // Déjà null, pas besoin de conversion
    updatedAt: dbLibrary.updated_at, // Déjà null, pas besoin de conversion
    usedFor: dbLibrary.used_for, // Déjà null, pas besoin de conversion
    version: dbLibrary.version, // Déjà null, pas besoin de conversion
  }
}

/**
 * Convertit un objet Library en DbLibrary
 * @param library Objet de l'application
 * @returns Objet pour la base de données
 */
export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  const dbLibrary: Partial<DbLibrary> = {}

  if (library.id !== undefined) dbLibrary.id = library.id
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor
  if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt
  if (library.description !== undefined) dbLibrary.description = library.description
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl
  if (library.features !== undefined) dbLibrary.features = library.features
  if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl
  if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource
  if (library.languageId !== undefined) dbLibrary.language_id = library.languageId
  if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath
  if (library.name !== undefined) dbLibrary.name = library.name
  if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite
  if (library.popularity !== undefined) dbLibrary.popularity = library.popularity
  if (library.subtype !== undefined) dbLibrary.sub_type = library.subtype
  if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType
  if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt
  if (library.usedFor !== undefined) dbLibrary.used_for = library.usedFor
  if (library.version !== undefined) dbLibrary.version = library.version

  return dbLibrary
}
