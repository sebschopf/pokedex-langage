import type { DbLibrary } from "@/types/database/library"
import type { Library } from "@/types/models/library"

/**
 * Convertit une bibliothèque de la base de données en modèle d'application
 */
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: dbLibrary.id,
    name: dbLibrary.name,
    // Utiliser le slug de la base de données, avec fallback au cas où
    slug: dbLibrary.slug || dbLibrary.name.toLowerCase().replace(/\s+/g, "-"),
    description: dbLibrary.description || null,
    languageId: dbLibrary.language_id || 0,
    technologyType: dbLibrary.technology_type || null,
    websiteUrl: dbLibrary.website_url || null,
    githubUrl: dbLibrary.github_url || null,
    logoPath: dbLibrary.logo_path || null,
    isPopular: dbLibrary.is_popular || false,
    createdAt: dbLibrary.created_at,
    updatedAt: dbLibrary.updated_at || null,
    documentationUrl: dbLibrary.documentation_url || null,
    bestFor: dbLibrary.best_for || null,
    category: dbLibrary.category || null,
    stars: dbLibrary.stars || null,
    lastRelease: dbLibrary.last_release || null,
    license: dbLibrary.license || null,
    features: dbLibrary.features || [],
    version: dbLibrary.version || null,
    subtype: dbLibrary.subtype || null,
    popularity: dbLibrary.popularity || 0,
    isOpenSource: dbLibrary.is_open_source || false,
    officialWebsite: dbLibrary.official_website || null,
    uniqueSellingPoint: dbLibrary.unique_selling_point || null,
    usedFor: dbLibrary.used_for || null,
  }
}

/**
 * Convertit un objet Library en DbLibrary
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
  if (library.createdAt !== undefined) {
    if (library.createdAt !== null) {
      dbLibrary.created_at = library.createdAt
    }
  }
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor
  if (library.category !== undefined) dbLibrary.category = library.category
  if (library.stars !== undefined) dbLibrary.stars = library.stars
  if (library.lastRelease !== undefined) dbLibrary.last_release = library.lastRelease
  if (library.license !== undefined) dbLibrary.license = library.license
  if (library.features !== undefined) dbLibrary.features = library.features
  if (library.version !== undefined) dbLibrary.version = library.version
  if (library.subtype !== undefined) dbLibrary.subtype = library.subtype
  if (library.popularity !== undefined) dbLibrary.popularity = library.popularity
  if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource
  if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite
  if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint

  // Correction pour la propriété used_for
  // Nous vérifions que usedFor n'est pas undefined avant de l'assigner
  // Si usedFor est null, nous ne l'assignons pas du tout
  if (library.usedFor !== undefined) {
    if (library.usedFor !== null) {
      dbLibrary.used_for = library.usedFor
    }
  }

  return dbLibrary
}
