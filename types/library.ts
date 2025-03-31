//types/library.ts
export interface Library {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string | number
  name: string
  languageId?: number | null
  description?: string | null
  officialWebsite?: string | null
  githubUrl?: string | null
  logoPath?: string | null
  popularity?: number | null
  isOpenSource?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
  features?: string[] | null
  uniqueSellingPoint?: string | null
  bestFor?: string | null
  usedFor?: string | null
  documentationUrl?: string | null
  version?: string | null

  // Propriétés en snake_case pour la compatibilité avec la base de données
  language_id?: number | null
  official_website?: string | null
  github_url?: string | null
  logo_path?: string | null
  is_open_source?: boolean | null
  created_at?: string | null
  updated_at?: string | null
  unique_selling_point?: string | null
  best_for?: string | null
  used_for?: string | null
  documentation_url?: string | null
}

