/**
 * Point d'entrée pour les types de base de données
 * Réexporte le type Database généré par Supabase CLI
 */

// Importer et réexporter les types générés avec "export type"
export type { Database, Tables, TablesInsert, TablesUpdate, Enums, CompositeTypes } from "./database-types"

// Réexporter explicitement le type Json depuis database-types
export type { Json } from "./database-types"

// Réexporter les constantes (qui ne sont pas des types)
export { Constants } from "./database-types"

// Réexporter tous les autres types du dossier database/
export * from "./database/index"
