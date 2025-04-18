import type { Json } from "@/types/database-types"

/**
 * Interface représentant un langage de programmation dans l'application
 * Utilise la convention camelCase pour les noms de propriétés
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
  tools: Json | null
}
