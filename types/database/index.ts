/**
 * Point d'entrée pour tous les types de base de données
 * Ces types correspondent exactement à la structure des tables dans Supabase
 */

// Importer et réexporter le type Json depuis database-types.ts
import type { Json } from "../database-types"
export type { Json }

// Exporter les types de tables
export type { DbCorrection } from "./correction"
export type { DbLanguageProposal } from "./language-proposal"
export type { DbLanguageUsage } from "./language-usage"
export type { DbLanguage } from "./language"
export type { DbLibrary } from "./library"
export type { DbLibraryLanguage } from "./library-language"
export type { DbProfile } from "./profile"
export type { DbTechnologyCategory } from "./technology-category"
export type { DbTechnologySubtype } from "./technology-subtype"
export type { DbTodoCategory } from "./todo-category"
export type { DbTodoStatus } from "./todo-status"
export type { DbTodo } from "./todo"
export type { DbUsageCategory } from "./usage-category"
export type { DbUserRole } from "./user-role"
