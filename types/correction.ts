// types/correction.ts
export interface Correction {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string | number
  languageId: number
  framework?: string | null
  correctionText: string
  status: string
  field?: string | null
  suggestion?: string | null
  userId?: string | null
  createdAt?: string | null
  updatedAt?: string | null

  // Propriétés en snake_case pour la compatibilité avec la base de données
  language_id: number
  correction_text: string
  user_id?: string | null
  created_at?: string | null
  updated_at?: string | null
}

