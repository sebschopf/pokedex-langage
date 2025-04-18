import type { Database } from "@/types/database-types"
import type { Language } from "@/types/models/language"
import type { DbLanguage } from "@/types/database/language"
import { toBoolean } from "@/utils/conversion/type-conversion"

/**
 * Convertit un langage de la base de données (snake_case) en modèle d'application (camelCase)
 * @param dbLanguage Langage de la base de données
 * @returns Langage pour l'application
 */
export function dbToLanguage(dbLanguage: Database["public"]["Tables"]["languages"]["Row"]): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    shortDescription: dbLanguage.short_description,
    description: dbLanguage.description,
    type: dbLanguage.type,
    usedFor: dbLanguage.used_for,
    yearCreated: dbLanguage.year_created,
    usageRate: dbLanguage.usage_rate,
    isOpenSource: toBoolean(dbLanguage.is_open_source),
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,
    creator: dbLanguage.creator,
    logoPath: dbLanguage.logo_path,
    popularFrameworks: dbLanguage.popular_frameworks,
    strengths: dbLanguage.strengths,
    tools: dbLanguage.tools,
  }
}

/**
 * Convertit un modèle d'application (camelCase) en langage pour la base de données (snake_case)
 * @param language Langage pour l'application
 * @returns Langage pour la base de données
 */
export function languageToDb(language: Language): Database["public"]["Tables"]["languages"]["Insert"] {
  return {
    id: language.id,
    name: language.name,
    slug: language.slug,
    short_description: language.shortDescription,
    description: language.description,
    type: language.type,
    used_for: language.usedFor,
    year_created: language.yearCreated,
    usage_rate: language.usageRate,
    is_open_source: language.isOpenSource,
    created_at: language.createdAt,
    updated_at: language.updatedAt,
    creator: language.creator,
    logo_path: language.logoPath,
    popular_frameworks: language.popularFrameworks,
    strengths: language.strengths,
    tools: language.tools,
  }
}

/**
 * Convertit un DbLanguage (snake_case) en Language (camelCase)
 * @param dbLanguage Langage de la base de données
 * @returns Langage avec propriétés en camelCase
 */
export function dbLanguageToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    shortDescription: dbLanguage.short_description,
    type: dbLanguage.type,
    usedFor: dbLanguage.used_for,
    usageRate: dbLanguage.usage_rate,
    yearCreated: dbLanguage.year_created,
    popularFrameworks: dbLanguage.popular_frameworks,
    strengths: dbLanguage.strengths,
    isOpenSource: dbLanguage.is_open_source,
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,
    creator: dbLanguage.creator,
    description: dbLanguage.description,
    logoPath: dbLanguage.logo_path,
    tools: dbLanguage.tools,
  }
}

/**
 * Convertit un Language (camelCase) en DbLanguage (snake_case)
 * @param language Langage avec propriétés en camelCase
 * @returns Langage pour la base de données
 */
export function languageToDbLanguage(language: Language): DbLanguage {
  return {
    id: language.id,
    name: language.name,
    slug: language.slug,
    short_description: language.shortDescription,
    type: language.type,
    used_for: language.usedFor,
    usage_rate: language.usageRate,
    year_created: language.yearCreated,
    popular_frameworks: language.popularFrameworks,
    strengths: language.strengths,
    is_open_source: language.isOpenSource,
    created_at: language.createdAt,
    updated_at: language.updatedAt,
    creator: language.creator,
    description: language.description,
    logo_path: language.logoPath,
    tools: language.tools,
  }
}
