// Type DbLibrary corrigé pour correspondre exactement à la structure de la table dans Supabase
// Notez que slug est maintenant défini comme string | null pour correspondre à ce que Supabase retourne
export type DbLibrary = {
  id: number
  name: string
  slug: string
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
}
