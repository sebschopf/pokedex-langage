import type { DbLibrary } from "@/types/database/library"
import type { Library } from "@/types/models/library"

/**
 * Convertit un objet DbLibrary en Library
 * @param dbLibrary Objet de la base de données
 * @returns Objet Library pour l'application
 */
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: dbLibrary.id,
    name: dbLibrary.name,
    slug: dbLibrary.slug,
    description: dbLibrary.description || null,
    languageId: dbLibrary.language_id,
    technologyType: dbLibrary.technology_type || null,
    websiteUrl: dbLibrary.website_url || null,
    githubUrl: dbLibrary.github_url || null,
    logoPath: dbLibrary.logo_path || null,
    isPopular: dbLibrary.is_popular || false,
    createdAt: dbLibrary.created_at || null,
    updatedAt: dbLibrary.updated_at || null,
    // Conserver toutes les autres propriétés qui existent dans votre interface
    documentationUrl: dbLibrary.documentation_url || null,
    bestFor: dbLibrary.best_for || null,
    category: dbLibrary.category || null,
    stars: dbLibrary.stars || null,
    lastRelease: dbLibrary.last_release || null,
    license: dbLibrary.license || null,
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
  if (library.name !== undefined) dbLibrary.name = library.name
  if (library.slug !== undefined) dbLibrary.slug = library.slug
  if (library.description !== undefined) dbLibrary.description = library.description
  if (library.languageId !== undefined) dbLibrary.language_id = library.languageId
  if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType
  if (library.websiteUrl !== undefined) dbLibrary.website_url = library.websiteUrl
  if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl
  if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath
  if (library.isPopular !== undefined) dbLibrary.is_popular = library.isPopular
  if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt
  // Conserver toutes les autres propriétés qui existent dans votre interface
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor
  if (library.category !== undefined) dbLibrary.category = library.category
  if (library.stars !== undefined) dbLibrary.stars = library.stars
  if (library.lastRelease !== undefined) dbLibrary.last_release = library.lastRelease
  if (library.license !== undefined) dbLibrary.license = library.license

  return dbLibrary
}
