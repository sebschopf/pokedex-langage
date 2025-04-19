// Mise à jour du type Language pour inclure les propriétés manquantes
export type Language = {
  id: number
  name: string
  slug: string
  description?: string | null
  shortDescription?: string | null
  type?: string | null
  creator?: string | null
  yearCreated?: number | null
  usageRate?: number | null
  isOpenSource?: boolean | null
  usedFor?: string | null
  logoPath?: string | null
  popularFrameworks?: string[] | null
  createdAt?: string | null
  updatedAt?: string | null
  githubUrl?: string | null
  websiteUrl?: string | null
  currentVersion?: string | null
  lastUpdated?: string | null
  license?: string | null
  difficulty?: number | null
}
