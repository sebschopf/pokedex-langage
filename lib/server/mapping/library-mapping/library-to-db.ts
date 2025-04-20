import type { DbLibrary } from "@/types/database/library"
import type { Library } from "@/types/models/library"

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
  if (library.slug !== undefined) dbLibrary.slug = library.slug // Déjà correct car on vérifie si undefined, pas si null
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

  return dbLibrary
}
