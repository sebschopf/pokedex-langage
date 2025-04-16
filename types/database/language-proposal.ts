/**
 * Interface représentant une proposition de langage dans la base de données
 * Correspond exactement à la structure de la table language_proposals dans Supabase
 */
export interface DbLanguageProposal {
  id: number
  name: string
  description: string | null
  type: string | null
  user_id: string | null
  status: string
  created_at: string | null
  updated_at: string | null
  created_year: number | null
  creator: string | null
  popular_frameworks: string[] | null
  strengths: string[] | null
  used_for: string | null
}
