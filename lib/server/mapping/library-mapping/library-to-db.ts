import type { Library } from '@/types/models/library';
import type { DbLibrary } from '@/types/database/library';

/**
 * Convertit un objet de bibliothèque de l'application en objet pour la base de données
 * @param library Objet de l'application à convertir
 * @returns Objet pour la base de données
 */
export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  const result: Partial<DbLibrary> = {};

  // Mapper uniquement les propriétés définies
  if (library.id !== undefined) result.id = library.id;
  if (library.name !== undefined) result.name = library.name;
  if (library.slug !== undefined) result.slug = library.slug;
  if (library.languageId !== undefined) result.language_id = library.languageId;
  if (library.description !== undefined) result.description = library.description;
  if (library.officialWebsite !== undefined) result.official_website = library.officialWebsite;
  if (library.githubUrl !== undefined) result.github_url = library.githubUrl;
  if (library.logoPath !== undefined) result.logo_path = library.logoPath;
  if (library.popularity !== undefined) result.popularity = library.popularity;
  if (library.isOpenSource !== undefined) result.is_open_source = library.isOpenSource;
  if (library.createdAt !== undefined) result.created_at = library.createdAt;
  if (library.updatedAt !== undefined) result.updated_at = library.updatedAt;
  if (library.features !== undefined) result.features = library.features;
  if (library.uniqueSellingPoint !== undefined)
    result.unique_selling_point = library.uniqueSellingPoint;
  if (library.bestFor !== undefined) result.best_for = library.bestFor;
  if (library.usedFor !== undefined) result.used_for = library.usedFor;
  if (library.documentationUrl !== undefined) result.documentation_url = library.documentationUrl;
  if (library.version !== undefined) result.version = library.version;
  if (library.technologyType !== undefined) result.technology_type = library.technologyType;
  if (library.subtype !== undefined) result.subtype = library.subtype;
  if (library.license !== undefined) result.license = library.license;
  if (library.websiteUrl !== undefined) result.website_url = library.websiteUrl;

  return result;
}
