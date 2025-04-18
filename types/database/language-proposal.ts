/**
 * Interface représentant une proposition de langage dans la base de données
 * Correspond exactement à la structure de la table language_proposals dans Supabase
 */
export interface DbLanguageProposal {
  id: number
  name: string
  description: string | null
  user_id: string | null
  created_at: string | null
  updated_at: string | null
  status: string
  type: string | null
  created_year: number | null
  creator: string | null
  used_for: string | null
  strengths: string[] | null
  popular_frameworks: string[] | null
}

/**
 * Interface représentant une proposition de langage dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface DbLanguageProposalModel {
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
