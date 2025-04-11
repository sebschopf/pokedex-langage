import type { Json } from "@/types/supabase"

/**
 * Type représentant un langage de programmation tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'languages' dans Supabase
 */
export type DbLanguage = {
  created_at: string | null
  creator: string | null
  description: string | null
  id: number
  is_open_source: boolean | null
  logo_path: string | null
  name: string
  popular_frameworks: string[] | null
  short_description: string | null
  slug: string
  strengths: string[] | null
  tools: Json | null
  type: string | null
  updated_at: string | null
  usage_rate: number | null
  used_for: string | null
  year_created: number | null
}
