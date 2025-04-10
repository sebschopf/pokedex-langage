export interface Library {
  id: string
  name: string
  languageId: string
  description: string  // Non-nullable selon la DB
  officialWebsite: string  // Non-nullable selon la DB
  githubUrl?: string | null
  logoPath?: string | null
  popularity?: number | null
  isOpenSource?: boolean | null
  features: string[]  // Non-nullable selon la DB
  uniqueSellingPoint: string  // Non-nullable selon la DB
  bestFor: string  // Non-nullable selon la DB
  usedFor: string  // C'est une string, pas un array
  documentationUrl?: string | null
  version?: string | null
  createdAt: string
  updatedAt: string
  technologyType?: string | null
  subtype?: string | null
  
  // Propriétés en snake_case pour la compatibilité
  language_id: string
  official_website: string
  github_url?: string | null
  logo_path?: string | null
  is_open_source?: boolean | null
  unique_selling_point: string
  best_for: string
  used_for: string
  documentation_url?: string | null
  created_at: string
  updated_at: string
}