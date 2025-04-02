import type { Database } from "@/lib/database-types"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"
import type { Correction } from "@/types/correction"
import type { LanguageProposal } from "@/types/language-proposal"
import type { UserRoleType } from "@/types/user-role"
import type { LanguageUsage } from "@/types/language-usage"
import type { UsageCategory } from "@/types/usage-category"
import type { Profile } from "@/types/profile"

// Types des tables Supabase
export type DbLanguage = Database["public"]["Tables"]["languages"]["Row"]
export type DbLibrary = Database["public"]["Tables"]["libraries"]["Row"]
export type DbCorrection = Database["public"]["Tables"]["corrections"]["Row"]
export type DbLanguageProposal = Database["public"]["Tables"]["language_proposals"]["Row"]
export type DbUserRole = Database["public"]["Tables"]["user_roles"]["Row"]
export type DbLanguageUsage = Database["public"]["Tables"]["language_usage"]["Row"]
export type DbUsageCategory = Database["public"]["Tables"]["usage_categories"]["Row"]
export type DbProfile = Database["public"]["Tables"]["profiles"]["Row"]

// Fonctions de conversion pour Language
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    // Propriétés en camelCase
    createdYear: dbLanguage.year_created,
    creator: dbLanguage.creator,
    description: dbLanguage.description,
    logo: dbLanguage.logo_path,
    shortDescription: dbLanguage.short_description,
    type: dbLanguage.type as Language["type"],
    usedFor: dbLanguage.used_for,
    usageRate: dbLanguage.usage_rate,
    isOpenSource: dbLanguage.is_open_source,
    strengths: dbLanguage.strengths || [],
    popularFrameworks: dbLanguage.popular_frameworks || [],
    tools: dbLanguage.tools,
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,

    // Propriétés en snake_case
    year_created: dbLanguage.year_created,
    logo_path: dbLanguage.logo_path,
    short_description: dbLanguage.short_description,
    used_for: dbLanguage.used_for,
    usage_rate: dbLanguage.usage_rate,
    is_open_source: dbLanguage.is_open_source,
    created_at: dbLanguage.created_at,
    updated_at: dbLanguage.updated_at,
  }
}

// Fonction de conversion pour Library
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: dbLibrary.id,
    name: dbLibrary.name,
    languageId: dbLibrary.language_id,
    description: dbLibrary.description,
    officialWebsite: dbLibrary.official_website,
    githubUrl: dbLibrary.github_url,
    logoPath: dbLibrary.logo_path,
    popularity: dbLibrary.popularity,
    isOpenSource: dbLibrary.is_open_source,
    features: dbLibrary.features || [],
    uniqueSellingPoint: dbLibrary.unique_selling_point,
    bestFor: dbLibrary.best_for,
    usedFor: dbLibrary.used_for,
    documentationUrl: dbLibrary.documentation_url,
    version: dbLibrary.version,
    createdAt: dbLibrary.created_at,
    updatedAt: dbLibrary.updated_at,
  }
}

// Fonction de conversion pour Correction
export function dbToCorrection(dbCorrection: DbCorrection): Correction {
  return {
    id: dbCorrection.id,
    languageId: Number(dbCorrection.language_id), // Conversion explicite en nombre
    framework: dbCorrection.framework,
    correctionText: dbCorrection.correction_text,
    field: dbCorrection.field,
    suggestion: dbCorrection.suggestion,
    status: dbCorrection.status,
    userId: dbCorrection.user_id,
    createdAt: dbCorrection.created_at,
    updatedAt: dbCorrection.updated_at,
  }
}

// Fonction de conversion pour LanguageProposal
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: dbProposal.id,
    name: dbProposal.name,
    type: dbProposal.type,
    description: dbProposal.description,
    createdYear: dbProposal.created_year,
    creator: dbProposal.creator,
    usedFor: dbProposal.used_for,
    strengths: dbProposal.strengths || [],
    popularFrameworks: dbProposal.popular_frameworks || [],
    userId: dbProposal.user_id,
    status: dbProposal.status,
    createdAt: dbProposal.created_at,
    updatedAt: dbProposal.updated_at,
  }
}

// Fonction de conversion pour Profile
export function dbToProfile(dbProfile: DbProfile): Profile {
  return {
    id: dbProfile.id,
    username: dbProfile.username,
    avatarUrl: dbProfile.avatar_url,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at,
    // Propriétés en snake_case
    avatar_url: dbProfile.avatar_url,
    created_at: dbProfile.created_at,
    updated_at: dbProfile.updated_at,
  }
}

// Fonction de conversion pour UserRole
export function dbToUserRole(dbUserRole: DbUserRole): {
  id: string
  role: UserRoleType
  createdAt: string
  updatedAt: string
} {
  return {
    id: dbUserRole.id,
    role: dbUserRole.role,
    createdAt: dbUserRole.created_at,
    updatedAt: dbUserRole.updated_at,
  }
}

// Fonction de conversion pour LanguageUsage
export function dbToLanguageUsage(dbUsage: DbLanguageUsage): LanguageUsage {
  return {
    id: dbUsage.id,
    // Conversion explicite en nombre pour être cohérent
    languageId: Number(dbUsage.language_id),
    categoryId: Number(dbUsage.category_id),
    createdAt: dbUsage.created_at,
    // Propriétés en snake_case pour la cohérence
    language_id: dbUsage.language_id,
    category_id: dbUsage.category_id,
    created_at: dbUsage.created_at,
  }
}

// Fonction de conversion pour UsageCategory
export function dbToUsageCategory(dbCategory: DbUsageCategory): UsageCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    createdAt: dbCategory.created_at,
  }
}

