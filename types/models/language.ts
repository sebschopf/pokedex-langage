import type { Json } from "@/types/database-types"

/**
 * Interface représentant un langage de programmation dans l'application
 * Version transformée et normalisée de DbLanguage
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
  githubUrl: string | null
  websiteUrl: string | null
  currentVersion: string | null
  lastUpdated: string | null
  license: string | null
  difficulty: number | null
  tools: Json | null
}
