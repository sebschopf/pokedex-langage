export interface Correction {
  id: number
  languageId: number
  languageName?: string
  languageSlug?: string
  framework?: string
  correctionText: string
  status: string
  createdAt: string
  updatedAt: string
  field?: string // Champ concerné par la correction
  suggestion?: string // Suggestion de correction
  type?: "language" | "library" // Type de correction
}

