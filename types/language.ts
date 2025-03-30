export interface Language {
  // Propriétés principales
  id: string | number
  name: string
  slug?: string

  // Propriétés en camelCase (pour la compatibilité avec votre code existant)
  logo?: string
  shortDescription?: string
  type?: "Frontend" | "Backend" | "Fullstack" | "Mobile" | "Data" | "Business"
  usedFor?: string
  usageRate?: number
  createdYear?: number
  popularFrameworks?: string[]
  strengths?: string[]
  difficulty?: 1 | 2 | 3 | 4 | 5
  isOpenSource?: boolean
  currentVersion?: string
  lastUpdated?: string

  // Propriétés en snake_case (pour la compatibilité avec Supabase)
  logo_path?: string
  short_description?: string
  used_for?: string
  usage_rate?: number
  year_created?: number
  popular_frameworks?: string[]
  is_open_source?: boolean
  current_version?: string
  last_updated?: string

  // Propriétés communes
  tools?: {
    parsers?: string[]
    validators?: string[]
    templateEngines?: string[]
    [key: string]: string[] | undefined
  }
  license?: string
  created_at?: string
  updated_at?: string

  // Propriété pour la description complète
  description?: string
}

