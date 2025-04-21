/**
 * Type représentant un langage de programmation dans l'application
 */
export type Language = {
  id: number
  name: string
  slug: string
  description: string | null
  shortDescription: string | null
  type: string | null
  creator: string | null
  yearCreated: number | null
  usageRate: number | null
  isOpenSource: boolean | null
  usedFor: string | null
  logoPath: string | null
  popularFrameworks: string[] | null
  createdAt: string | null
  updatedAt: string | null
  githubUrl: string | null
  websiteUrl: string | null
  currentVersion: string | null
  lastUpdated: string | null
  license: string | null
  difficulty: number | null
  strengths: string[] | null
  tools: Record<string, any> | null
}
