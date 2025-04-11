/**
 * Type représentant une proposition de langage telle que stockée dans la base de données
 * Correspond exactement à la structure de la table 'language_proposals' dans Supabase
 */
export type DbLanguageProposal = {
  created_at: string | null
  created_year: number | null
  creator: string | null
  description: string | null
  id: number
  name: string
  popular_frameworks: string[] | null
  status: string
  strengths: string[] | null
  type: string | null
  updated_at: string | null
  used_for: string | null
  user_id: string | null
}
