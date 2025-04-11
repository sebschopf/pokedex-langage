/**
 * Type représentant une bibliothèque/framework tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'libraries' dans Supabase
 */
export type DbLibrary = {
  best_for: string | null
  created_at: string | null
  description: string | null
  documentation_url: string | null
  features: string[] | null
  github_url: string | null
  id: number
  is_open_source: boolean | null
  language_id: number | null
  logo_path: string | null
  name: string
  official_website: string | null
  popularity: number | null
  sub_type: string | null
  technology_type: string | null
  unique_selling_point: string | null
  updated_at: string | null
  used_for: string | null // C'est une chaîne, pas un tableau
  version: string | null
}
