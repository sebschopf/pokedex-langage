// Types de base de données
export type {
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
} from "./database";

// Types pour les langages de programmation
export type { LanguageType, Language } from "./language";

// Types pour les bibliothèques
export type { Library } from "./library";

// Types pour les propositions de langages
export type { LanguageProposal } from "./language-proposal";

// Types pour les catégories d'utilisation
export type { UsageCategory } from "./usage-category";

// Types pour les corrections
export type { CorrectionStatus, Correction, NewCorrection } from "./correction";

// Types pour les notifications toast
export type { ToasterToast, Toast } from "./toast";

// Types pour l'utilisation des langages
export type { LanguageUsage } from "./language-usage";

// Types pour les rôles utilisateur
export type { UserRoleType, UserRole } from "./user-role";

// Types pour les profils utilisateur
export type { Profile } from "./profile";

// Types pour les associations bibliothèque-langage
export type { LibraryLanguage } from "./library-language";

// Types pour les catégories de technologies
export type { TechnologyCategory } from "./technology-category";

// Types pour les sous-types de technologies
export type { TechnologySubtype } from "./technology-subtype";

// Fonctions de conversion pour la base de données
export {
  dbToLanguage,
  languageToDb,
  dbToLibrary,
  libraryToDb,
  dbToCorrection,
  correctionToDb,
  dbToLanguageProposal,
  languageProposalToDb,
  dbToUserRole,
  userRoleToDb,
  dbToLanguageUsage,
  languageUsageToDb,
  dbToUsageCategory,
  usageCategoryToDb,
  dbToProfile,
  profileToDb,
  dbToLibraryLanguage,
  libraryLanguageToDb,
  dbToTechnologyCategory,
  technologyCategoryToDb,
  dbToTechnologySubtype,
  technologySubtypeToDb
} from "@/lib/database-mapping";