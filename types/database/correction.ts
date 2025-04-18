/**
 * Interface représentant une correction dans la base de données
 * Correspond exactement à la structure de la table corrections dans Supabase
 */
export interface DbCorrection {
  id: number
  language_id: number
  correction_text: string
  suggestion: string | null
  field: string | null
  framework: string | null
  status: string
  user_id: string | null
  created_at: string | null
  updated_at: string | null
}

/**
 * Interface représentant une correction dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface Correction {
  id: number
  languageId: number
  correctionText: string
  suggestion: string | null
  field: string | null
  framework: string | null
  status: string
  userId: string | null
  createdAt: string | null
  updatedAt: string | null
}
