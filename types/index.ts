/**
 * types/index.ts
 *
 * Ce fichier centralise tous les types utilisés dans l'application.
 * Il permet d'importer facilement les types depuis un seul point d'entrée.
 */

// ===== Types de base de données =====
/**
 * Types liés à la structure de la base de données
 */
export * from "./database"

// ===== Types d'entités =====
/**
 * Types représentant les entités principales de l'application
 */
export type { LanguageType, Language } from "./language"
export type { Library } from "./library"
export type { LanguageProposal } from "./language-proposal"
export type { UsageCategory } from "./usage-category"
export type { CorrectionStatus, Correction, NewCorrection } from "./correction"
export type { LanguageUsage } from "./language-usage"
export type { UserRoleType, UserRole } from "./user-role"
export type { Profile } from "./profile"
export type { LibraryLanguage } from "./library-language"
export type { TechnologyCategory } from "./technology-category"
export type { TechnologySubtype } from "./technology-subtype"
export type { Todo } from "./todo"
export type { TodoCategory } from "./todo-category"
export type { TodoStatus } from "./todo-status"

// ===== Types DTO (Data Transfer Objects) =====
/**
 * Types utilisés pour le transfert de données entre les couches de l'application
 */
export type { TodoFormValues } from "./todo-form-values"
export type { AuthUser, UserProfile, UserRoleData, UserWithDetails } from "./user-management"

// ===== Fonctions de conversion =====
/**
 * Fonctions utilitaires pour convertir entre les types de la base de données et les types de l'application
 */
export * from "@/lib/database-mapping"
export { dbToLanguage, languageToDb } from "../lib/database-mapping"
export { dbToLibrary, libraryToDb } from "../lib/database-mapping"

// ===== Types et fonctions API =====
/**
 * Types et fonctions pour les opérations API
 */
export type { FrameworkFilterOptions } from "../lib/api"
export { getFrameworksByLanguageId, clearFrameworksCache } from "../lib/api"
