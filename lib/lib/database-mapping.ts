// lib/database-mapping.ts

/**
 * Fonctions de mapping entre les types de base de données et les types de modèles
 * Ces fonctions permettent de convertir les données entre le format de la base de données
 * et le format utilisé dans l'application
 */

// Utiliser any pour éviter les erreurs d'importation de types
type Correction = any;
type Language = any;
type Library = any;
type LanguageProposal = any;
type LibraryLanguage = any;
type TechnologyCategory = any;
type TechnologySubtype = any;

type DbCorrection = any;
type DbLanguage = any;
type DbLibrary = any;
type DbLanguageProposal = any;
type DbLibraryLanguage = any;
type DbTechnologyCategory = any;
type DbTechnologySubtype = any;

/**
 * Convertit un objet DbLanguage en Language
 * @param dbLanguage Objet de la base de données
 * @returns Objet Language pour l'application
 */
export function dbToLanguage(dbLanguage: DbLanguage): Language {
  // Conversion avec vérification des propriétés
  const result: any = {
    id: dbLanguage.id,
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
  };
  
  return result;
}

/**
 * Convertit un objet Language en DbLanguage
 * @param language Objet de l'application
 * @returns Objet pour la base de données
 */
export function languageToDb(language: Partial<Language>): Partial<DbLanguage> {
  const dbLanguage: any = {};
  
  if (language.id !== undefined) dbLanguage.id = language.id;
  if (language.name !== undefined) dbLanguage.name = language.name;
  if (language.slug !== undefined) dbLanguage.slug = language.slug;
  if (language.shortDescription !== undefined) dbLanguage.short_description = language.shortDescription;
  if (language.type !== undefined) dbLanguage.type = language.type;
  if (language.usedFor !== undefined) dbLanguage.used_for = language.usedFor;
  if (language.usageRate !== undefined) dbLanguage.usage_rate = language.usageRate;
  if (language.yearCreated !== undefined) dbLanguage.year_created = language.yearCreated;
  if (language.popularFrameworks !== undefined) dbLanguage.popular_frameworks = language.popularFrameworks;
  if (language.strengths !== undefined) dbLanguage.strengths = language.strengths;
  if (language.isOpenSource !== undefined) dbLanguage.is_open_source = language.isOpenSource;
  if (language.createdAt !== undefined) dbLanguage.created_at = language.createdAt;
  if (language.updatedAt !== undefined) dbLanguage.updated_at = language.updatedAt;
  if (language.creator !== undefined) dbLanguage.creator = language.creator;
  if (language.description !== undefined) dbLanguage.description = language.description;
  if (language.logoPath !== undefined) dbLanguage.logo_path = language.logoPath;
  
  return dbLanguage;
}

/**
 * Convertit un objet DbLibrary en Library
 * @param dbLibrary Objet de la base de données
 * @returns Objet Library pour l'application
 */
export function dbToLibrary(dbLibrary: DbLibrary): Library {
  const result: any = {
    id: dbLibrary.id,
    languageId: dbLibrary.language_id,
    technologyType: dbLibrary.technology_type,
    subtype: dbLibrary.sub_type, // Attention: utiliser sub_type et non subtype
    name: dbLibrary.name,
    description: dbLibrary.description,
    usedFor: dbLibrary.used_for,
    features: dbLibrary.features,
    officialWebsite: dbLibrary.official_website,
    uniqueSellingPoint: dbLibrary.unique_selling_point,
    bestFor: dbLibrary.best_for,
    version: dbLibrary.version,
    createdAt: dbLibrary.created_at,
    updatedAt: dbLibrary.updated_at,
    githubUrl: dbLibrary.github_url,
    logoPath: dbLibrary.logo_path,
    popularity: dbLibrary.popularity,
    isOpenSource: dbLibrary.is_open_source,
    documentationUrl: dbLibrary.documentation_url,
  };
  
  return result;
}

/**
 * Convertit un objet Library en DbLibrary
 * @param library Objet de l'application
 * @returns Objet pour la base de données
 */
export function libraryToDb(library: Partial<Library>): Partial<DbLibrary> {
  const dbLibrary: any = {};
  
  if (library.id !== undefined) dbLibrary.id = library.id;
  if (library.languageId !== undefined) dbLibrary.language_id = library.languageId;
  if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType;
  if (library.subtype !== undefined) dbLibrary.sub_type = library.subtype; // Attention: utiliser sub_type et non subtype
  if (library.name !== undefined) dbLibrary.name = library.name;
  if (library.description !== undefined) dbLibrary.description = library.description;
  if (library.usedFor !== undefined) dbLibrary.used_for = library.usedFor;
  if (library.features !== undefined) dbLibrary.features = library.features;
  if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite;
  if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint;
  if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor;
  if (library.version !== undefined) dbLibrary.version = library.version;
  if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt;
  if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt;
  if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl;
  if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath;
  if (library.popularity !== undefined) dbLibrary.popularity = library.popularity;
  if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource;
  if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl;
  
  return dbLibrary;
}

/**
 * Convertit un objet DbCorrection en Correction
 * @param dbCorrection Objet de la base de données
 * @returns Objet Correction pour l'application
 */
export function dbToCorrection(dbCorrection: DbCorrection): Correction {
  // Utiliser une conversion explicite pour éviter les erreurs de type
  const result: any = {
    id: dbCorrection.id,
    languageId: dbCorrection.language_id,
    field: dbCorrection.field,
    suggestion: dbCorrection.suggestion,
    status: dbCorrection.status,
    // Convertir les dates en nombre si nécessaire
    createdAt: typeof dbCorrection.created_at === 'string' ? new Date(dbCorrection.created_at).getTime() : dbCorrection.created_at,
    updatedAt: typeof dbCorrection.updated_at === 'string' ? new Date(dbCorrection.updated_at).getTime() : dbCorrection.updated_at,
    framework: dbCorrection.framework,
    correctionText: dbCorrection.correction_text,
    userId: dbCorrection.user_id,
  };
  
  return result;
}

/**
 * Convertit un objet Correction en DbCorrection
 * @param correction Objet de l'application
 * @returns Objet pour la base de données
 */
export function correctionToDb(correction: Partial<Correction>): Partial<DbCorrection> {
  const dbCorrection: any = {};
  
  if (correction.id !== undefined) dbCorrection.id = correction.id;
  if (correction.languageId !== undefined) dbCorrection.language_id = correction.languageId;
  if (correction.field !== undefined) dbCorrection.field = correction.field;
  if (correction.suggestion !== undefined) dbCorrection.suggestion = correction.suggestion;
  if (correction.status !== undefined) dbCorrection.status = correction.status;
  
  // Convertir les timestamps en chaînes ISO si nécessaire
  if (correction.createdAt !== undefined) {
    dbCorrection.created_at = typeof correction.createdAt === 'number' 
      ? new Date(correction.createdAt).toISOString() 
      : correction.createdAt;
  }
  
  if (correction.updatedAt !== undefined) {
    dbCorrection.updated_at = typeof correction.updatedAt === 'number' 
      ? new Date(correction.updatedAt).toISOString() 
      : correction.updatedAt;
  }
  
  if (correction.framework !== undefined) dbCorrection.framework = correction.framework;
  if (correction.correctionText !== undefined) dbCorrection.correction_text = correction.correctionText;
  if (correction.userId !== undefined) dbCorrection.user_id = correction.userId;
  
  return dbCorrection;
}

/**
 * Convertit un objet DbLanguageProposal en LanguageProposal
 * @param dbProposal Objet de la base de données
 * @returns Objet LanguageProposal pour l'application
 */
export function dbToLanguageProposal(dbProposal: DbLanguageProposal): LanguageProposal {
  const result: any = {
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
  };
  
  return result;
}

/**
 * Convertit un objet LanguageProposal en DbLanguageProposal
 * @param proposal Objet de l'application
 * @returns Objet pour la base de données
 */
export function languageProposalToDb(proposal: Partial<LanguageProposal>): Partial<DbLanguageProposal> {
  const dbProposal: any = {};
  
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
  
  return dbProposal;
}

/**
 * Convertit un objet DbLibraryLanguage en LibraryLanguage
 * @param dbLibraryLanguage Objet de la base de données
 * @returns Objet LibraryLanguage pour l'application
 */
export function dbToLibraryLanguage(dbLibraryLanguage: DbLibraryLanguage): LibraryLanguage {
  // Conversion explicite pour gérer les différences de type
  const result: any = {
    // Convertir l'ID en nombre si c'est une chaîne
    id: typeof dbLibraryLanguage.id === 'string' ? parseInt(dbLibraryLanguage.id, 10) : dbLibraryLanguage.id,
    libraryId: dbLibraryLanguage.library_id,
    languageId: dbLibraryLanguage.language_id,
    primaryLanguage: dbLibraryLanguage.primary_language === null ? false : dbLibraryLanguage.primary_language,
    createdAt: dbLibraryLanguage.created_at,
  };
  
  return result;
}

/**
 * Convertit un objet LibraryLanguage en DbLibraryLanguage
 * @param libraryLanguage Objet de l'application
 * @returns Objet pour la base de données
 */
export function libraryLanguageToDb(libraryLanguage: Partial<LibraryLanguage>): Partial<DbLibraryLanguage> {
  const dbLibraryLanguage: any = {};
  
  // Convertir l'ID en chaîne si c'est un nombre
  if (libraryLanguage.id !== undefined) {
    dbLibraryLanguage.id = typeof libraryLanguage.id === 'number' 
      ? String(libraryLanguage.id) 
      : libraryLanguage.id;
  }
  
  if (libraryLanguage.libraryId !== undefined) dbLibraryLanguage.library_id = libraryLanguage.libraryId;
  if (libraryLanguage.languageId !== undefined) dbLibraryLanguage.language_id = libraryLanguage.languageId;
  
  // Gérer les valeurs nullables
  if (libraryLanguage.primaryLanguage !== undefined) {
    dbLibraryLanguage.primary_language = libraryLanguage.primaryLanguage;
  }
  
  if (libraryLanguage.createdAt !== undefined) dbLibraryLanguage.created_at = libraryLanguage.createdAt;
  
  return dbLibraryLanguage;
}

/**
 * Convertit un objet DbTechnologyCategory en TechnologyCategory
 * @param dbCategory Objet de la base de données
 * @returns Objet TechnologyCategory pour l'application
 */
export function dbToTechnologyCategory(dbCategory: DbTechnologyCategory): TechnologyCategory {
  const result: any = {
    id: dbCategory.id,
    type: dbCategory.type,
    iconName: dbCategory.icon_name,
    color: dbCategory.color,
    createdAt: dbCategory.created_at,
  };
  
  return result;
}

/**
 * Convertit un objet TechnologyCategory en DbTechnologyCategory
 * @param category Objet de l'application
 * @returns Objet pour la base de données
 */
export function technologyCategoryToDb(category: Partial<TechnologyCategory>): Partial<DbTechnologyCategory> {
  const dbCategory: any = {};
  
  if (category.id !== undefined) dbCategory.id = category.id;
  if (category.type !== undefined) dbCategory.type = category.type;
  if (category.iconName !== undefined) dbCategory.icon_name = category.iconName;
  if (category.color !== undefined) dbCategory.color = category.color;
  if (category.createdAt !== undefined) dbCategory.created_at = category.createdAt;
  
  return dbCategory;
}

/**
 * Convertit un objet DbTechnologySubtype en TechnologySubtype
 * @param dbSubtype Objet de la base de données
 * @returns Objet TechnologySubtype pour l'application
 */
export function dbToTechnologySubtype(dbSubtype: DbTechnologySubtype): TechnologySubtype {
  const result: any = {
    id: dbSubtype.id,
    categoryId: dbSubtype.category_id,
    name: dbSubtype.name,
    createdAt: dbSubtype.created_at,
  };
  
  return result;
}

/**
 * Convertit un objet TechnologySubtype en DbTechnologySubtype
 * @param subtype Objet de l'application
 * @returns Objet pour la base de données
 */
export function technologySubtypeToDb(subtype: Partial<TechnologySubtype>): Partial<DbTechnologySubtype> {
  const dbSubtype: any = {};
  
  if (subtype.id !== undefined) dbSubtype.id = subtype.id;
  if (subtype.categoryId !== undefined) dbSubtype.category_id = subtype.categoryId;
  if (subtype.name !== undefined) dbSubtype.name = subtype.name;
  if (subtype.createdAt !== undefined) dbSubtype.created_at = subtype.createdAt;
  
  return dbSubtype;
}