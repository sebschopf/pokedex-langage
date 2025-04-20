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
    slug: dbLibrary.slug, // Déjà correct car slug est string | null dans les deux types
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
  }
}
