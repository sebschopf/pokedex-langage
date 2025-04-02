// types/correction.ts

export type CorrectionStatus = "pending" | "approved" | "rejected"

export interface Correction {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string
  languageId: number // Changé de string à number pour correspondre à la base de données
  libraryName?: string | null
  field: string
  suggestion: string
  status: string
  framework?: string | null
  correctionText: string
  userId?: string | null
  createdAt: string
  updatedAt: string

  // Propriétés en snake_case pour la compatibilité avec la base de données (optionnelles)
  language_id?: number // Changé de string à number
  library_name?: string | null
  correction_text?: string
  user_id?: string | null
  created_at?: string
  updated_at?: string
}

// Interface pour la création d'une nouvelle correction
export interface NewCorrection {
  languageId: number // Changé de string à number
  libraryName?: string | null
  field: string
  suggestion: string
  framework?: string | null
  correctionText: string
}

