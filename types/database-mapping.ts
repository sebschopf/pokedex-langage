import type { Database } from "@/lib/database-types"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"
import type { Correction } from "@/types/correction"
import type { LanguageProposal } from "@/types/language-proposal"
import type { UserRole } from "@/types/user-role"
import type { LanguageUsage } from "@/types/language-usage"
import type { UsageCategory } from "@/types/usage-category"

// Types des tables Supabase
export type DbLanguage = Database["public"]["Tables"]["languages"]["Row"]
export type DbLibrary = Database["public"]["Tables"]["libraries"]["Row"]
export type DbCorrection = Database["public"]["Tables"]["corrections"]["Row"]
export type DbLanguageProposal = Database["public"]["Tables"]["language_proposals"]["Row"]
export type DbUserRole = Database["public"]["Tables"]["user_roles"]["Row"]
export type DbLanguageUsage = Database["public"]["Tables"]["language_usage"]["Row"]
export type DbUsageCategory = Database["public"]["Tables"]["usage_categories"]["Row"]

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
    popular_frameworks: dbLanguage.popular_frameworks || [],
    created_at: dbLanguage.created_at,
    updated_at: dbLanguage.updated_at,
  }
}

// Modifiez la fonction languageToDb pour gérer correctement les valeurs null
export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  return {
    id: language.id?.toString(),
    name: language.name,
    slug: language.slug,
    // Utiliser l'opérateur de coalescence nulle (??) pour éviter d'assigner null
    year_created: language.createdYear ?? language.year_created ?? undefined,
    creator: language.creator ?? undefined,
    description: language.description ?? undefined,
    logo_path: language.logo ?? language.logo_path ?? undefined,
    short_description: language.shortDescription ?? language.short_description ?? undefined,
    type: language.type ?? undefined,
    used_for: language.usedFor ?? language.used_for ?? undefined,
    usage_rate: language.usageRate ?? language.usage_rate ?? undefined,
    is_open_source: language.isOpenSource ?? language.is_open_source ?? undefined,
    strengths: language.strengths ?? undefined,
    popular_frameworks: language.popularFrameworks ?? language.popular_frameworks ?? undefined,
    tools: language.tools ?? undefined,
  }
}

// Fonctions de conversion pour Library
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  return {
    id: dbLibrary.id,
    name: dbLibrary.name,
    // Propriétés en camelCase
    languageId: dbLibrary.language_id ? Number.parseInt(dbLibrary.language_id) : null,
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

    // Propriétés en snake_case pour la compatibilité
    language_id: dbLibrary.language_id ? Number.parseInt(dbLibrary.language_id) : null,
    official_website: dbLibrary.official_website,
    github_url: dbLibrary.github_url,
    logo_path: dbLibrary.logo_path,
    is_open_source: dbLibrary.is_open_source,
    created_at: dbLibrary.created_at,
    updated_at: dbLibrary.updated_at,
    unique_selling_point: dbLibrary.unique_selling_point,
    best_for: dbLibrary.best_for,
    used_for: dbLibrary.used_for,
    documentation_url: dbLibrary.documentation_url,
  }
}

export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  return {
    id: library.id?.toString(),
    name: library.name,
    language_id: library.languageId?.toString() ?? (typeof library.language_id === "number" ? library.language_id.toString() : library.language_id) ?? undefined,
    description: library.description ?? undefined,
    official_website: library.officialWebsite ?? library.official_website ?? undefined,
    github_url: library.githubUrl ?? library.github_url ?? undefined,
    logo_path: library.logoPath ?? library.logo_path ?? undefined,
    popularity: library.popularity ?? undefined,
    is_open_source: library.isOpenSource ?? library.is_open_source ?? undefined,
    features: library.features ?? undefined,
    unique_selling_point: library.uniqueSellingPoint ?? library.unique_selling_point ?? undefined,
    best_for: library.bestFor ?? library.best_for ?? undefined,
    used_for: library.usedFor ?? library.used_for ?? undefined,
    documentation_url: library.documentationUrl ?? library.documentation_url ?? undefined,
    version: library.version ?? undefined,
  }
}

// Fonctions de conversion pour Correction
export function dbToCorrection(dbCorrection: DbCorrection): Correction {
  return {
    id: dbCorrection.id,
    languageId: Number.parseInt(dbCorrection.language_id),
    language_id: Number.parseInt(dbCorrection.language_id),
    framework: dbCorrection.framework,
    correctionText: dbCorrection.correction_text,
    correction_text: dbCorrection.correction_text,
    status: dbCorrection.status,
    field: dbCorrection.field,
    suggestion: dbCorrection.suggestion,
    userId: dbCorrection.user_id,
    user_id: dbCorrection.user_id,
    createdAt: dbCorrection.created_at,
    created_at: dbCorrection.created_at,
    updatedAt: dbCorrection.updated_at,
    updated_at: dbCorrection.updated_at,
  }
}

export function correctionToDb(correction: Partial<Correction>): Partial<DbCorrection> {
  return {
    id: correction.id?.toString(), // Convertir en string au lieu de number
    language_id: correction.languageId?.toString() ?? correction.language_id?.toString() ?? undefined,
    framework: correction.framework ?? undefined,
    correction_text: correction.correctionText ?? correction.correction_text ?? undefined,
    status: correction.status ?? undefined,
    field: correction.field ?? undefined,
    suggestion: correction.suggestion ?? undefined,
    user_id: correction.userId?.toString() ?? correction.user_id ?? undefined,
  }
}

// Fonctions de conversion pour LanguageProposal
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  return {
    id: dbProposal.id,
    name: dbProposal.name,
    type: dbProposal.type,
    description: dbProposal.description,
    createdYear: dbProposal.created_year,
    created_year: dbProposal.created_year,
    creator: dbProposal.creator,
    usedFor: dbProposal.used_for,
    used_for: dbProposal.used_for,
    strengths: dbProposal.strengths,
    popularFrameworks: dbProposal.popular_frameworks,
    popular_frameworks: dbProposal.popular_frameworks,
    userId: dbProposal.user_id,
    user_id: dbProposal.user_id,
    status: dbProposal.status,
    createdAt: dbProposal.created_at,
    created_at: dbProposal.created_at,
    updatedAt: dbProposal.updated_at,
    updated_at: dbProposal.updated_at,
  }
}

export function languageProposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  return {
    id: proposal.id?.toString(), // Convertir en string au lieu de number
    name: proposal.name,
    type: proposal.type ?? undefined,
    description: proposal.description ?? undefined,
    created_year: proposal.createdYear ?? proposal.created_year ?? undefined,
    creator: proposal.creator ?? undefined,
    used_for: proposal.usedFor ?? proposal.used_for ?? undefined,
    strengths: proposal.strengths ?? undefined,
    popular_frameworks: proposal.popularFrameworks ?? proposal.popular_frameworks ?? undefined,
    user_id: proposal.userId?.toString() ?? proposal.user_id ?? undefined,
    status: proposal.status ?? undefined,
  }
}

// Fonctions de conversion pour UserRole
export function dbToUserRole(dbUserRole: DbUserRole): UserRole {
  return {
    id: dbUserRole.id,
    role: dbUserRole.role as UserRole["role"],
    createdAt: dbUserRole.created_at,
    created_at: dbUserRole.created_at,
    updatedAt: dbUserRole.updated_at,
    updated_at: dbUserRole.updated_at,
  }
}

export function userRoleToDb(userRole: Partial<UserRole>): Partial<DbUserRole> {
  return {
    id: userRole.id?.toString(),
    role: userRole.role,
  }
}

// Fonctions de conversion pour LanguageUsage
export function dbToLanguageUsage(dbUsage: DbLanguageUsage): LanguageUsage {
  return {
    id: dbUsage.id,
    languageId: dbUsage.language_id,
    language_id: dbUsage.language_id,
    categoryId: dbUsage.category_id,
    category_id: dbUsage.category_id,
    createdAt: dbUsage.created_at,
    created_at: dbUsage.created_at,
  }
}

export function languageUsageToDb(usage: Partial<LanguageUsage>): Partial<DbLanguageUsage> {
  return {
    id: usage.id?.toString(), // Convertir en string au lieu de number
    language_id: usage.languageId !== undefined ? Number(usage.languageId) : usage.language_id !== undefined ? Number(usage.language_id) : undefined,
    category_id: usage.categoryId !== undefined ? Number(usage.categoryId) : usage.category_id !== undefined ? Number(usage.category_id) : undefined,
  }
}

// Fonctions de conversion pour UsageCategory
export function dbToUsageCategory(dbCategory: DbUsageCategory): UsageCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    createdAt: dbCategory.created_at,
    created_at: dbCategory.created_at,
  }
}

export function usageCategoryToDb(category: Partial<UsageCategory>): Partial<DbUsageCategory> {
  return {
    id: category.id?.toString(), // Convertir en string au lieu de number
    name: category.name,
  }
}

