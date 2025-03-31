//types/language.ts
export type LanguageType = "Frontend" | "Backend" | "Fullstack" | "Mobile" | "Data" | "Business"

export interface Language {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string | number
  name: string
  slug: string
  createdYear?: number | null
  creator?: string | null
  description?: string | null
  logo?: string | null
  shortDescription?: string | null
  type?: LanguageType | null
  usedFor?: string | null
  usageRate?: number | null
  isOpenSource?: boolean | null
  strengths?: string[] | null
  popularFrameworks?: string[] | null
  tools?: any | null
  createdAt?: string | null
  updatedAt?: string | null

  // Propriétés en snake_case pour la compatibilité avec la base de données
  year_created?: number | null
  logo_path?: string | null
  short_description?: string | null
  used_for?: string | null
  usage_rate?: number | null
  is_open_source?: boolean | null
  popular_frameworks?: string[] | null
  created_at?: string | null
  updated_at?: string | null
}

