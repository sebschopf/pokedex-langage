import type { DbLanguage } from "@/types/database"
import type { Language } from "@/types/models"

/**
 * Convertit un objet DbLanguage en Language
 * @param dbLanguage Objet de la base de données
 * @returns Objet Language pour l'application
 */
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    createdAt: dbLanguage.created_at,
    creator: dbLanguage.creator,
    description: dbLanguage.description,
    isOpenSource: dbLanguage.is_open_source,
    logoPath: dbLanguage.logo_path,
    popularFrameworks: dbLanguage.popular_frameworks,
    shortDescription: dbLanguage.short_description,
    slug: dbLanguage.slug,
    strengths: dbLanguage.strengths,
    tools: dbLanguage.tools,
    type: dbLanguage.type,
    updatedAt: dbLanguage.updated_at,
    usageRate: dbLanguage.usage_rate,
    usedFor: dbLanguage.used_for,
    yearCreated: dbLanguage.year_created,
  }
}

/**
 * Convertit un objet Language en DbLanguage
 * @param language Objet de l'application
 * @returns Objet pour la base de données
 */
export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  const dbLanguage: Partial<DbLanguage> = {}

  if (language.id !== undefined) dbLanguage.id = language.id
  if (language.name !== undefined) dbLanguage.name = language.name
  if (language.createdAt !== undefined) dbLanguage.created_at = language.createdAt
  if (language.creator !== undefined) dbLanguage.creator = language.creator
  if (language.description !== undefined) dbLanguage.description = language.description
  if (language.isOpenSource !== undefined) dbLanguage.is_open_source = language.isOpenSource
  if (language.logoPath !== undefined) dbLanguage.logo_path = language.logoPath
  if (language.popularFrameworks !== undefined) dbLanguage.popular_frameworks = language.popularFrameworks
  if (language.shortDescription !== undefined) dbLanguage.short_description = language.shortDescription
  if (language.slug !== undefined) dbLanguage.slug = language.slug
  if (language.strengths !== undefined) dbLanguage.strengths = language.strengths
  if (language.tools !== undefined) dbLanguage.tools = language.tools
  if (language.type !== undefined) dbLanguage.type = language.type
  if (language.updatedAt !== undefined) dbLanguage.updated_at = language.updatedAt
  if (language.usageRate !== undefined) dbLanguage.usage_rate = language.usageRate
  if (language.usedFor !== undefined) dbLanguage.used_for = language.usedFor
  if (language.yearCreated !== undefined) dbLanguage.year_created = language.yearCreated

  return dbLanguage
}
