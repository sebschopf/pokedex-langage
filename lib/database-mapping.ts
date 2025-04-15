import type { DbLanguage } from "@/types/database/language"
import type { Language } from "@/types/models/language"

/**
 * Convertit un objet DbLanguage en Language
 * @param dbLanguage Objet de la base de données
 * @returns Objet Language pour l'application
 */
export function dbToLanguage(dbLanguage: any): Language {
  // Utiliser une assertion de type pour convertir l'ID en nombre si nécessaire
  return {
    id: typeof dbLanguage.id === "string" ? Number.parseInt(dbLanguage.id, 10) : dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    shortDescription: dbLanguage.short_description,
    type: dbLanguage.type,
    usedFor: dbLanguage.used_for,
    usageRate: dbLanguage.usage_rate,
    yearCreated: dbLanguage.year_created,
    popularFrameworks: dbLanguage.popular_frameworks || [],
    strengths: dbLanguage.strengths || [],
    isOpenSource: dbLanguage.is_open_source,
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,
    creator: dbLanguage.creator,
    description: dbLanguage.description,
    logoPath: dbLanguage.logo_path,
    githubUrl: dbLanguage.github_url,
    websiteUrl: dbLanguage.website_url,
    currentVersion: dbLanguage.current_version,
    lastUpdated: dbLanguage.last_updated,
    license: dbLanguage.license,
    difficulty: dbLanguage.difficulty,
    tools: dbLanguage.tools,
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
  if (language.slug !== undefined) dbLanguage.slug = language.slug
  if (language.shortDescription !== undefined) dbLanguage.short_description = language.shortDescription
  if (language.type !== undefined) dbLanguage.type = language.type
  if (language.usedFor !== undefined) dbLanguage.used_for = language.usedFor
  if (language.usageRate !== undefined) dbLanguage.usage_rate = language.usageRate
  if (language.yearCreated !== undefined) dbLanguage.year_created = language.yearCreated
  if (language.popularFrameworks !== undefined) dbLanguage.popular_frameworks = language.popularFrameworks
  if (language.strengths !== undefined) dbLanguage.strengths = language.strengths
  if (language.isOpenSource !== undefined) dbLanguage.is_open_source = language.isOpenSource
  if (language.createdAt !== undefined) dbLanguage.created_at = language.createdAt
  if (language.updatedAt !== undefined) dbLanguage.updated_at = language.updatedAt
  if (language.creator !== undefined) dbLanguage.creator = language.creator
  if (language.description !== undefined) dbLanguage.description = language.description
  if (language.logoPath !== undefined) dbLanguage.logo_path = language.logoPath
  if (language.githubUrl !== undefined) dbLanguage.github_url = language.githubUrl
  if (language.websiteUrl !== undefined) dbLanguage.website_url = language.websiteUrl
  if (language.currentVersion !== undefined) dbLanguage.current_version = language.currentVersion
  if (language.lastUpdated !== undefined) dbLanguage.last_updated = language.lastUpdated
  if (language.license !== undefined) dbLanguage.license = language.license
  if (language.difficulty !== undefined) dbLanguage.difficulty = language.difficulty
  if (language.tools !== undefined) dbLanguage.tools = language.tools

  return dbLanguage
}
