/**
 * Interface représentant une proposition de langage dans l'application
 * Version transformée et normalisée de DbLanguageProposal
 */
export interface LanguageProposal {
  id: number
  name: string
  description: string | null
  type: string | null
  userId: string
  status: string
  createdAt: string | null
  updatedAt: string | null
  // Propriétés supplémentaires
  createdYear: number | null
  creator: string | null
  popularFrameworks: string[] | null
  strengths: string[] | null
  usedFor: string | null
  // Ajoutez d'autres propriétés selon vos besoins
}
