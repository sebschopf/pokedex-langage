import type { DbLibrary } from "@/types/database/library"
import type { Library } from "@/types/models/library"

/**
 * Convertit un objet de bibliothèque de la base de données en objet de bibliothèque pour l'application
 * @param dbLibrary Objet de la base de données à convertir
 * @returns Objet de bibliothèque pour l'application
 */
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: dbLibrary.id,
    name: dbLibrary.name,
    languageId: dbLibrary.language_id,
    description: dbLibrary.description,
    officialWebsite: dbLibrary.official_website,
    githubUrl: dbLibrary.github_url,
    logoPath: dbLibrary.logo_path,
    popularity: dbLibrary.popularity,
    isOpenSource: dbLibrary.is_open_source,
    createdAt: dbLibrary.created_at,
    updatedAt: dbLibrary.updated_at,
    features: dbLibrary.features,
    uniqueSellingPoint: dbLibrary.unique_selling_point,
    bestFor: dbLibrary.best_for,
    usedFor: dbLibrary.used_for,
    documentationUrl: dbLibrary.documentation_url,
    version: dbLibrary.version,
    technologyType: dbLibrary.technology_type,
    subtype: dbLibrary.subtype,
    slug: dbLibrary.slug,
  }
}

/**
 * Convertit un objet de bibliothèque de l'application en objet de bibliothèque pour la base de données
 * @param library Objet de l'application à convertir (peut être partiel)
 * @returns Objet partiel pour la base de données
 */
export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  const dbLibrary: Partial<DbLibrary> = {}

  // Mapper uniquement les propriétés définies (non undefined)
  if (library.id !== undefined) dbLibrary.id = library.id
  if (library.name !== undefined) dbLibrary.name = library.name
  if (library.languageId !== undefined) dbLibrary.language_id = library.languageId
  if (library.description !== undefined) dbLibrary.description = library.description
  if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite
  if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl
  if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath
  if (library.popularity !== undefined) dbLibrary.popularity = library.popularity
  if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource
  if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt
  if (library.features !== undefined) dbLibrary.features = library.features
  if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor
  if (library.usedFor !== undefined) dbLibrary.used_for = library.usedFor
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl
  if (library.version !== undefined) dbLibrary.version = library.version
  if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType
  if (library.subtype !== undefined) dbLibrary.subtype = library.subtype
  if (library.slug !== undefined) dbLibrary.slug = library.slug

  return dbLibrary
}

/**
 * Vérifie si une bibliothèque contient tous les champs obligatoires
 * @param library Objet de bibliothèque à vérifier
 * @returns true si tous les champs obligatoires sont présents
 */
export function hasRequiredLibraryFields(library: Partial<Library>): boolean {
  // Définir les champs obligatoires pour une bibliothèque valide
  return (
    typeof library.name === 'string' && 
    library.name.trim() !== '' &&
    typeof library.slug === 'string' && 
    library.slug.trim() !== ''
  )
}