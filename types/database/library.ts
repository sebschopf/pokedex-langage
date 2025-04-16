export interface DbLibrary {
  id: number
  name: string
  slug: string
  description: string | null
  language_id: number | null
  technology_type: string | null
  website_url: string | null
  github_url: string | null
  logo_path: string | null
  is_popular: boolean | null
  created_at: string
  updated_at: string | null
  documentation_url: string | null
  best_for: string | null
  category: string | null
  stars: number | null
  last_release: string | null
  license: string | null
  features: string[] | null
  version: string | null
  subtype: string | null
  popularity: number | null
  is_open_source: boolean | null
  official_website: string | null
  unique_selling_point: string | null
  used_for: string | null
}
