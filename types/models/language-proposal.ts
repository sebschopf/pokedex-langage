/**
 * Interface représentant une proposition de langage dans l'application
 */
export interface LanguageProposal {
  id: number
  name: string
  description: string | null
  userId: string | null
  createdAt: string | null
  updatedAt: string | null
  status: string
  type: string | null
  createdYear: number | null
  creator: string | null
  usedFor: string | null
  strengths: string[] | null
  popularFrameworks: string[] | null
}
