import type { DbLanguage } from "@/types/database/language"
import type { Language } from "@/types/models/language"

/**
 * Convertit un objet Language en objet DbLanguage
 * @param language Objet Language à convertir
 * @returns Objet DbLanguage
 */
export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  const dbLanguage: Partial<DbLanguage> = {}

  // Mapper les propriétés de base
  if (language.id !== undefined) dbLanguage.id = language.id
  if (language.name !== undefined) dbLanguage.name = language.name
  if (language.slug !== undefined) dbLanguage.slug = language.slug
  if (language.description !== undefined) dbLanguage.description = language.description
  if (language.shortDescription !== undefined) dbLanguage.short_description = language.shortDescription
  if (language.type !== undefined) dbLanguage.type = language.type
  if (language.creator !== undefined) dbLanguage.creator = language.creator
  if (language.yearCreated !== undefined) dbLanguage.year_created = language.yearCreated
  if (language.usageRate !== undefined) dbLanguage.usage_rate = language.usageRate
  if (language.isOpenSource !== undefined) dbLanguage.is_open_source = language.isOpenSource
  if (language.usedFor !== undefined) dbLanguage.used_for = language.usedFor
  if (language.logoPath !== undefined) dbLanguage.logo_path = language.logoPath
  if (language.popularFrameworks !== undefined) dbLanguage.popular_frameworks = language.popularFrameworks
  if (language.createdAt !== undefined) dbLanguage.created_at = language.createdAt
  if (language.updatedAt !== undefined) dbLanguage.updated_at = language.updatedAt

  // Mapper les propriétés supplémentaires
  if (language.githubUrl !== undefined) dbLanguage.github_url = language.githubUrl
  if (language.websiteUrl !== undefined) dbLanguage.website_url = language.websiteUrl
  if (language.currentVersion !== undefined) dbLanguage.current_version = language.currentVersion
  if (language.lastUpdated !== undefined) dbLanguage.last_updated = language.lastUpdated
  if (language.license !== undefined) dbLanguage.license = language.license
  if (language.difficulty !== undefined) dbLanguage.difficulty = language.difficulty

  return dbLanguage
}
