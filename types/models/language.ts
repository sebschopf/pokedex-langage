/**
 * Interface représentant un langage de programmation dans l'application
 * Version transformée et normalisée de DbLanguage
 */
export interface Language {
  createdAt: string | null
  creator: string | null
  description: string | null
  id: number
  isOpenSource: boolean | null
  logoPath: string | null
  name: string
  popularFrameworks: string[] | null
  shortDescription: string | null
  slug: string
  strengths: string[] | null
  tools: Json | null
  type: string | null
  updatedAt: string | null
  usageRate: number | null
  usedFor: string | null
  yearCreated: number | null
}

// Declare the Json type
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
