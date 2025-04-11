/**
 * Interface représentant une proposition de langage dans l'application
 * Version transformée et normalisée de DbLanguageProposal
 */
export interface LanguageProposal {
    createdAt: string | null
    createdYear: number | null
    creator: string | null
    description: string | null
    id: number
    name: string
    popularFrameworks: string[] | null
    status: string
    strengths: string[] | null
    type: string | null
    updatedAt: string | null
    usedFor: string | null
    userId: string | null
  }
  