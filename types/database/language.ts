import type { Json } from "@/types/supabase"

/**
 * Type représentant un langage de programmation dans la base de données
 */
export type DbLanguage = {
  id: number
  name: string
  slug: string
  description?: string | null
  short_description?: string | null
  type?: string | null
  creator?: string | null
  year_created?: number | null
  usage_rate?: number | null
  is_open_source?: boolean | null
  used_for?: string | null
  logo_path?: string | null
  popular_frameworks?: string[] | null
  created_at?: string | null
  updated_at?: string | null
  github_url?: string | null
  website_url?: string | null
  current_version?: string | null
  last_updated?: string | null
  license?: string | null
  difficulty?: number | null
  strengths?: string[] | null
  tools?: Json | null
}
