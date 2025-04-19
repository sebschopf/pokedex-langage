import type { DbLanguage } from "@/types/database/language"
import type { Language } from "@/types/models/language"

/**
 * Convertit un objet DbLanguage en objet Language
 * @param dbLanguage Objet DbLanguage à convertir
 * @returns Objet Language
 */
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    description: dbLanguage.description || null,
    shortDescription: dbLanguage.short_description || null,
    type: dbLanguage.type || null,
    creator: dbLanguage.creator || null,
    yearCreated: dbLanguage.year_created || null,
    usageRate: dbLanguage.usage_rate || null,
    isOpenSource: dbLanguage.is_open_source || null,
    usedFor: dbLanguage.used_for || null,
    logoPath: dbLanguage.logo_path || null,
    popularFrameworks: dbLanguage.popular_frameworks || null,
    createdAt: dbLanguage.created_at || null,
    updatedAt: dbLanguage.updated_at || null,

    // Propriétés supplémentaires
    githubUrl: dbLanguage.github_url || null,
    websiteUrl: dbLanguage.website_url || null,
    currentVersion: dbLanguage.current_version || null,
    lastUpdated: dbLanguage.last_updated || null,
    license: dbLanguage.license || null,
    difficulty: dbLanguage.difficulty || null,
  }
}
