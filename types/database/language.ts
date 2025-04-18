import type { Json } from "@/types/database-types"

/**
 * Interface représentant un langage de programmation dans la base de données
 * Correspond exactement à la structure de la table languages dans Supabase
 */
export interface DbLanguage {
  id: number
  name: string
  slug: string
  short_description: string | null
  type: string | null
  used_for: string | null
  usage_rate: number | null
  year_created: number | null
  popular_frameworks: string[] | null
  strengths: string[] | null
  is_open_source: boolean | null
  created_at: string | null
  updated_at: string | null
  creator: string | null
  description: string | null
  logo_path: string | null
  tools: Json | null
}

/**
 * Interface représentant un langage de programmation dans l'application
 * Version avec des noms de propriétés en camelCase
 */
export interface Language {
  id: number
  name: string
  slug: string
  shortDescription: string | null
  type: string | null
  usedFor: string | null
  usageRate: number | null
  yearCreated: number | null
  popularFrameworks: string[] | null
  strengths: string[] | null
  isOpenSource: boolean | null
  createdAt: string | null
  updatedAt: string | null
  creator: string | null
  description: string | null
  logoPath: string | null
  tools: Json | null
}
