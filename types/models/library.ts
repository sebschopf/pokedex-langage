/**
 * Interface représentant une bibliothèque dans l'application
 * Version transformée et normalisée de DbLibrary
 */
export interface Library {
  id: number
  name: string
  slug: string
  description: string | null
  languageId: number
  technologyType: string | null
  websiteUrl: string | null
  githubUrl: string | null
  logoPath: string | null
  isPopular: boolean
  createdAt: string | null
  updatedAt: string | null
  // Propriétés supplémentaires
  documentationUrl: string | null
  bestFor: string | null
  category: string | null
  stars: number | null
  lastRelease: string | null
  license: string | null
}
