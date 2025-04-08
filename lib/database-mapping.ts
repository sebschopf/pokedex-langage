import type {
  DbLanguage,
  DbLibrary,
  DbCorrection,
  DbLanguageProposal,
  DbUserRole,
  DbLanguageUsage,
  DbUsageCategory,
  DbProfile,
  DbLibraryLanguage,
  DbTechnologyCategory,
  DbTechnologySubtype
} from "@/types/database";

import type { Language, LanguageType } from "@/types/language";
import type { Library } from "@/types/library";
import type { Correction, CorrectionStatus } from "@/types/correction";
import type { LanguageProposal } from "@/types/language-proposal";
import type { UserRole, UserRoleType } from "@/types/user-role";
import type { LanguageUsage } from "@/types/language-usage";
import type { UsageCategory } from "@/types/usage-category";
import type { Profile } from "@/types/profile";
import type { LibraryLanguage } from "@/types/library-language";
import type { TechnologyCategory } from "@/types/technology-category";
import type { TechnologySubtype } from "@/types/technology-subtype";

// Fonctions de conversion pour Language
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    slug: dbLanguage.slug,
    description: dbLanguage.description,
    logoPath: dbLanguage.logo_path,
    officialWebsite: dbLanguage.official_website,
    githubUrl: dbLanguage.github_url,
    createdAt: dbLanguage.created_at,
    updatedAt: dbLanguage.updated_at,
    type: dbLanguage.type as LanguageType | null,
    popularity: dbLanguage.popularity,
    firstAppeared: dbLanguage.first_appeared,
    latestVersion: dbLanguage.latest_version,
    isOpenSource: dbLanguage.is_open_source,
    usedFor: dbLanguage.used_for,
    features: dbLanguage.features,
    paradigms: dbLanguage.paradigms,
    uniqueSellingPoint: dbLanguage.unique_selling_point,
    bestFor: dbLanguage.best_for,
    documentationUrl: dbLanguage.documentation_url,
    shortDescription: dbLanguage.short_description,
    usageRate: dbLanguage.usage_rate,
    strengths: dbLanguage.strengths,
    popularFrameworks: dbLanguage.popular_frameworks,
    tools: dbLanguage.tools
  };
}

export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  const dbLanguage: Partial<DbLanguage> = {};

  if (language.id !== undefined) dbLanguage.id = language.id;
  if (language.name !== undefined) dbLanguage.name = language.name;
  if (language.slug !== undefined) dbLanguage.slug = language.slug;
  if (language.description !== undefined) dbLanguage.description = language.description;
  if (language.logoPath !== undefined) dbLanguage.logo_path = language.logoPath;
  if (language.officialWebsite !== undefined) dbLanguage.official_website = language.officialWebsite;
  if (language.githubUrl !== undefined) dbLanguage.github_url = language.githubUrl;
  if (language.createdAt !== undefined) dbLanguage.created_at = language.createdAt;
  if (language.updatedAt !== undefined) dbLanguage.updated_at = language.updatedAt;
  if (language.type !== undefined) dbLanguage.type = language.type;
  if (language.popularity !== undefined) dbLanguage.popularity = language.popularity;
  if (language.firstAppeared !== undefined) dbLanguage.first_appeared = language.firstAppeared;
  if (language.latestVersion !== undefined) dbLanguage.latest_version = language.latestVersion;
  if (language.isOpenSource !== undefined) dbLanguage.is_open_source = language.isOpenSource;
  if (language.usedFor !== undefined) dbLanguage.used_for = language.usedFor;
  if (language.features !== undefined) dbLanguage.features = language.features;
  if (language.paradigms !== undefined) dbLanguage.paradigms = language.paradigms;
  if (language.uniqueSellingPoint !== undefined) dbLanguage.unique_selling_point = language.uniqueSellingPoint;
  if (language.bestFor !== undefined) dbLanguage.best_for = language.bestFor;
  if (language.documentationUrl !== undefined) dbLanguage.documentation_url = language.documentationUrl;
  if (language.shortDescription !== undefined) dbLanguage.short_description = language.shortDescription;
  if (language.usageRate !== undefined) dbLanguage.usage_rate = language.usageRate;
  if (language.strengths !== undefined) dbLanguage.strengths = language.strengths;
  if (language.popularFrameworks !== undefined) dbLanguage.popular_frameworks = language.popularFrameworks;
  if (language.tools !== undefined) dbLanguage.tools = language.tools;

  return dbLanguage;
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
    features: dbLibrary.features,
    uniqueSellingPoint: dbLibrary.unique_selling_point,
    bestFor: dbLibrary.best_for,
    usedFor: dbLibrary.used_for,
    documentationUrl: dbLibrary.documentation_url,
    version: dbLibrary.version,
    createdAt: dbLibrary.created_at,
    updatedAt: dbLibrary.updated_at,
    technologyType: dbLibrary.technology_type,
    subtype: dbLibrary.sub_type
  };
}

export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  const dbLibrary: Partial<DbLibrary> = {};

  if (library.id !== undefined) dbLibrary.id = library.id;
  if (library.name !== undefined) dbLibrary.name = library.name;
  if (library.languageId !== undefined) dbLibrary.language_id = library.languageId;
  if (library.description !== undefined) dbLibrary.description = library.description;
  if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite;
  if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl;
  if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath;
  if (library.popularity !== undefined) dbLibrary.popularity = library.popularity;
  if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource;
  if (library.features !== undefined) dbLibrary.features = library.features;
  if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint;
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor;
  if (library.usedFor !== undefined) dbLibrary.used_for = library.usedFor;
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl;
  if (library.version !== undefined) dbLibrary.version = library.version;
  if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt;
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt;
  if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType;
  if (library.subtype !== undefined) dbLibrary.sub_type = library.subtype;

  return dbLibrary;
}

// Fonction de conversion pour Correction
export function dbToCorrection(dbCorrection: DbCorrection): Correction {
  return {
    id: dbCorrection.id,
    languageId: dbCorrection.language_id,
    framework: dbCorrection.framework,
    correctionText: dbCorrection.correction_text,
    field: dbCorrection.field,
    suggestion: dbCorrection.suggestion,
    status: dbCorrection.status as CorrectionStatus,
    userId: dbCorrection.user_id,
    createdAt: dbCorrection.created_at,
    updatedAt: dbCorrection.updated_at
  };
}

export function correctionToDb(correction: Partial<Correction>): Partial<DbCorrection> {
  const dbCorrection: Partial<DbCorrection> = {};

  if (correction.id !== undefined) dbCorrection.id = correction.id;
  if (correction.languageId !== undefined) dbCorrection.language_id = correction.languageId;
  if (correction.framework !== undefined) dbCorrection.framework = correction.framework;
  if (correction.correctionText !== undefined) dbCorrection.correction_text = correction.correctionText;
  if (correction.field !== undefined) dbCorrection.field = correction.field;
  if (correction.suggestion !== undefined) dbCorrection.suggestion = correction.suggestion;
  if (correction.status !== undefined) dbCorrection.status = correction.status;
  if (correction.userId !== undefined) dbCorrection.user_id = correction.userId;
  if (correction.createdAt !== undefined) dbCorrection.created_at = correction.createdAt;
  if (correction.updatedAt !== undefined) dbCorrection.updated_at = correction.updatedAt;

  return dbCorrection;
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
    strengths: dbProposal.strengths,
    popularFrameworks: dbProposal.popular_frameworks,
    userId: dbProposal.user_id,
    status: dbProposal.status,
    createdAt: dbProposal.created_at,
    updatedAt: dbProposal.updated_at,
    reason: dbProposal.reason,
    officialWebsite: dbProposal.official_website,
    githubUrl: dbProposal.github_url
  };
}

export function languageProposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbProposal: Partial<DbLanguageProposal> = {};

  if (proposal.id !== undefined) dbProposal.id = proposal.id;
  if (proposal.name !== undefined) dbProposal.name = proposal.name;
  if (proposal.type !== undefined) dbProposal.type = proposal.type;
  if (proposal.description !== undefined) dbProposal.description = proposal.description;
  if (proposal.createdYear !== undefined) dbProposal.created_year = proposal.createdYear;
  if (proposal.creator !== undefined) dbProposal.creator = proposal.creator;
  if (proposal.usedFor !== undefined) dbProposal.used_for = proposal.usedFor;
  if (proposal.strengths !== undefined) dbProposal.strengths = proposal.strengths;
  if (proposal.popularFrameworks !== undefined) dbProposal.popular_frameworks = proposal.popularFrameworks;
  if (proposal.userId !== undefined) dbProposal.user_id = proposal.userId;
  if (proposal.status !== undefined) dbProposal.status = proposal.status;
  if (proposal.createdAt !== undefined) dbProposal.created_at = proposal.createdAt;
  if (proposal.updatedAt !== undefined) dbProposal.updated_at = proposal.updatedAt;
  if (proposal.reason !== undefined) dbProposal.reason = proposal.reason;
  if (proposal.officialWebsite !== undefined) dbProposal.official_website = proposal.officialWebsite;
  if (proposal.githubUrl !== undefined) dbProposal.github_url = proposal.githubUrl;

  return dbProposal;
}

// Fonction de conversion pour UserRole
export function dbToUserRole(dbUserRole: DbUserRole): UserRole {
  return {
    id: dbUserRole.id,
    userId: dbUserRole.user_id,
    role: dbUserRole.role as UserRoleType,
    createdAt: dbUserRole.created_at,
    updatedAt: dbUserRole.updated_at
  };
}

export function userRoleToDb(userRole: Partial<UserRole>): Partial<DbUserRole> {
  const dbUserRole: Partial<DbUserRole> = {};

  if (userRole.id !== undefined) dbUserRole.id = userRole.id;
  if (userRole.userId !== undefined) dbUserRole.user_id = userRole.userId;
  if (userRole.role !== undefined) dbUserRole.role = userRole.role;
  if (userRole.createdAt !== undefined) dbUserRole.created_at = userRole.createdAt;
  if (userRole.updatedAt !== undefined) dbUserRole.updated_at = userRole.updatedAt;

  return dbUserRole;
}

// Fonction de conversion pour LanguageUsage
export function dbToLanguageUsage(dbUsage: DbLanguageUsage): LanguageUsage {
  return {
    id: dbUsage.id,
    languageId: dbUsage.language_id,
    categoryId: dbUsage.category_id,
    createdAt: dbUsage.created_at
  };
}

export function languageUsageToDb(usage: Partial<LanguageUsage>): Partial<DbLanguageUsage> {
  const dbUsage: Partial<DbLanguageUsage> = {};

  if (usage.id !== undefined) dbUsage.id = usage.id;
  if (usage.languageId !== undefined) dbUsage.language_id = usage.languageId;
  if (usage.categoryId !== undefined) dbUsage.category_id = usage.categoryId;
  if (usage.createdAt !== undefined) dbUsage.created_at = usage.createdAt;

  return dbUsage;
}

// Fonction de conversion pour UsageCategory
export function dbToUsageCategory(dbCategory: DbUsageCategory): UsageCategory {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    description: dbCategory.description,
    createdAt: dbCategory.created_at
  };
}

export function usageCategoryToDb(category: Partial<UsageCategory>): Partial<DbUsageCategory> {
  const dbCategory: Partial<DbUsageCategory> = {};

  if (category.id !== undefined) dbCategory.id = category.id;
  if (category.name !== undefined) dbCategory.name = category.name;
  if (category.description !== undefined) dbCategory.description = category.description;
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt;

  return dbCategory;
}

// Fonction de conversion pour Profile
export function dbToProfile(dbProfile: DbProfile): Profile {
  return {
    id: dbProfile.id,
    userId: dbProfile.user_id,
    username: dbProfile.username,
    fullName: dbProfile.full_name,
    avatarUrl: dbProfile.avatar_url,
    website: dbProfile.website,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at
  };
}

export function profileToDb(profile: Partial<Profile>): Partial<DbProfile> {
  const dbProfile: Partial<DbProfile> = {};

  if (profile.id !== undefined) dbProfile.id = profile.id;
  if (profile.userId !== undefined) dbProfile.user_id = profile.userId;
  if (profile.username !== undefined) dbProfile.username = profile.username;
  if (profile.fullName !== undefined) dbProfile.full_name = profile.fullName;
  if (profile.avatarUrl !== undefined) dbProfile.avatar_url = profile.avatarUrl;
  if (profile.website !== undefined) dbProfile.website = profile.website;
  if (profile.createdAt !== undefined) dbProfile.created_at = profile.createdAt;
  if (profile.updatedAt !== undefined) dbProfile.updated_at = profile.updatedAt;

  return dbProfile;
}

// Fonction de conversion pour LibraryLanguage
export function dbToLibraryLanguage(dbLibraryLanguage: DbLibraryLanguage): LibraryLanguage {
  return {
    id: dbLibraryLanguage.id,
    libraryId: dbLibraryLanguage.library_id,
    languageId: dbLibraryLanguage.language_id,
    primaryLanguage: dbLibraryLanguage.primary_language,
    createdAt: dbLibraryLanguage.created_at
  };
}

export function libraryLanguageToDb(libraryLanguage: Partial<LibraryLanguage>): Partial<DbLibraryLanguage> {
  const dbLibraryLanguage: Partial<DbLibraryLanguage> = {};

  if (libraryLanguage.id !== undefined) dbLibraryLanguage.id = libraryLanguage.id;
  if (libraryLanguage.libraryId !== undefined) dbLibraryLanguage.library_id = libraryLanguage.libraryId;
  if (libraryLanguage.languageId !== undefined) dbLibraryLanguage.language_id = libraryLanguage.languageId;
  if (libraryLanguage.primaryLanguage !== undefined) dbLibraryLanguage.primary_language = libraryLanguage.primaryLanguage;
  if (libraryLanguage.createdAt !== undefined) dbLibraryLanguage.created_at = libraryLanguage.createdAt;

  return dbLibraryLanguage;
}

// Fonction de conversion pour TechnologyCategory
export function dbToTechnologyCategory(dbCategory: DbTechnologyCategory): TechnologyCategory {
  return {
    id: dbCategory.id,
    type: dbCategory.type,
    description: dbCategory.description,
    iconName: dbCategory.icon_name,
    color: dbCategory.color,
    createdAt: dbCategory.created_at,
    updatedAt: dbCategory.updated_at
  };
}

export function technologyCategoryToDb(category: Partial<TechnologyCategory>): Partial<DbTechnologyCategory> {
  const dbCategory: Partial<DbTechnologyCategory> = {};

  if (category.id !== undefined) dbCategory.id = category.id;
  if (category.type !== undefined) dbCategory.type = category.type;
  if (category.description !== undefined) dbCategory.description = category.description;
  if (category.iconName !== undefined) dbCategory.icon_name = category.iconName;
  if (category.color !== undefined) dbCategory.color = category.color;
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt;
  if (category.updatedAt !== undefined) dbCategory.updated_at = category.updatedAt;

  return dbCategory;
}

// Fonction de conversion pour TechnologySubtype
export function dbToTechnologySubtype(dbSubtype: DbTechnologySubtype): TechnologySubtype {
  return {
    id: dbSubtype.id,
    categoryId: dbSubtype.category_id,
    name: dbSubtype.name,
    description: dbSubtype.description,
    createdAt: dbSubtype.created_at,
    updatedAt: dbSubtype.updated_at
  };
}

export function technologySubtypeToDb(subtype: Partial<TechnologySubtype>): Partial<DbTechnologySubtype> {
  const dbSubtype: Partial<DbTechnologySubtype> = {};

  if (subtype.id !== undefined) dbSubtype.id = subtype.id;
  if (subtype.categoryId !== undefined) dbSubtype.category_id = subtype.categoryId;
  if (subtype.name !== undefined) dbSubtype.name = subtype.name;
  if (subtype.description !== undefined) dbSubtype.description = subtype.description;
  if (subtype.createdAt !== undefined) dbSubtype.created_at = subtype.createdAt;
  if (subtype.updatedAt !== undefined) dbSubtype.updated_at = subtype.updatedAt;

  return dbSubtype;
}