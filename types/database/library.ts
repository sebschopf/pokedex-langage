/**
 * Interface représentant une bibliothèque dans la base de données
 * Correspond exactement à la structure de la table libraries dans Supabase
 */
export interface DbLibrary {
  id: number
  name: string
  language_id: number | null
  description: string | null
  official_website: string | null
  github_url: string | null
  logo_path: string | null
  popularity: number | null
  is_open_source: boolean | null
  created_at: string | null
  updated_at: string | null
  features: string[] | null
  unique_selling_point: string | null
  best_for: string | null
  used_for: string | null
  documentation_url: string | null
  version: string | null
  technology_type: string | null
  subtype: string | null
  slug: string | null
}
