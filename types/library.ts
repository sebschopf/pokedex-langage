export interface Library {
  id: number | string
  name: string
  language_id: number | string
  description?: string
  website?: string
  github_url?: string
  logo_path?: string
  popularity?: number
  is_open_source?: boolean
  features?: string[]
  unique_selling_point?: string
  best_for?: string
  created_at?: string
  updated_at?: string
  used_for?: string
  documentation_url?: string
  version?: string
  
  // Propriétés alternatives (pour compatibilité)
  official_website?: string // Alternative à website
  usedFor?: string // Alternative à used_for
}

