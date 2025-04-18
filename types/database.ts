/**
 * Types et utilitaires pour la base de données
 */

import type { Database as DatabaseTypes } from "@/types/database-types"

// Type pour la base de données complète
export type Database = DatabaseTypes

// Type pour les tables de la base de données
export type Tables = DatabaseTypes["public"]["Tables"]

// Type pour les noms de tables
export type TableName = keyof Tables

// Fonction utilitaire pour vérifier si un nom de table est valide
export function isValidTableName(tableName: string): tableName is TableName {
  const validTableNames: TableName[] = [
    "languages",
    "libraries",
    "corrections",
    "language_proposals",
    "profiles",
    "user_roles",
    "todos",
    "todo_categories",
    "todo_status",
    "technology_categories",
    "technology_subtypes",
    "usage_categories",
    "library_languages",
    "language_usage",
  ]
  return validTableNames.includes(tableName as TableName)
}

// Type pour les lignes d'une table spécifique
export type Row<T extends TableName> = Tables[T]["Row"]

// Type pour les données d'insertion d'une table spécifique
export type Insert<T extends TableName> = Tables[T]["Insert"]

// Type pour les données de mise à jour d'une table spécifique
export type Update<T extends TableName> = Tables[T]["Update"]
