/**
 * Type représentant un usage de langage tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'language_usage' dans Supabase
 */
export type DbLanguageUsage = {
  category_id: number | null
  created_at: string | null
  id: number
  language_id: number | null
}

/**
 * Interface représentant un usage de langage dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface LanguageUsage {
  id: number
  languageId: number | null
  categoryId: number | null
  createdAt: string | null
}
