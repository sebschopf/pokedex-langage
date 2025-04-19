import { createServerClient } from "@/lib/supabase/server"
import { dbToLanguage } from "@/lib/server/mapping/language-mapping/language-mapping"
import type { DbLanguage } from "@/types/database/language"

// Options pour la récupération des langages
export interface GetLanguagesOptions {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  subtype?: string
  openSource?: boolean
  minUsage?: number
  sort?: "name" | "usage" | "year"
}

/**
 * Récupère la liste des langages avec pagination et filtres
 */
export async function getLanguages(options: GetLanguagesOptions = {}) {
  const { page = 1, pageSize = 10, search, category, subtype, openSource, minUsage, sort = "name" } = options

  const supabase = createServerClient()

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize

  // Construire la requête de base
  let query = supabase.from("languages").select("*", { count: "exact" })

  // Appliquer les filtres si nécessaire
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,short_description.ilike.%${search}%`)
  }

  if (category) {
    query = query.eq("type", category)
  }

  if (subtype) {
    query = query.contains("subtypes", [subtype])
  }

  if (openSource !== undefined) {
    query = query.eq("is_open_source", openSource)
  }

  if (minUsage !== undefined && minUsage > 0) {
    query = query.gte("usage_rate", minUsage)
  }

  // Ajouter le tri
  if (sort === "name") {
    query = query.order("name", { ascending: true })
  } else if (sort === "usage") {
    query = query.order("usage_rate", { ascending: false })
  } else if (sort === "year") {
    query = query.order("year_created", { ascending: true })
  }

  // Exécuter la requête avec pagination
  const { data, error, count } = await query.range(offset, offset + pageSize - 1)

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    throw error
  }

  // Convertir les données avec la fonction de mapping
  // Utiliser une assertion de type pour résoudre le problème de compatibilité
  const mappedData = data ? data.map((item: any) => dbToLanguage(item as unknown as DbLanguage)) : []

  return {
    data: mappedData,
    totalCount: count || 0,
    page,
    pageSize,
  }
}

/**
 * Récupère un langage par son ID
 */
export async function getLanguageById(id: number) {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("languages").select("*").eq("id", id).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage ${id}:`, error)
    throw error
  }

  // Utiliser une assertion de type pour résoudre le problème de compatibilité
  return data ? dbToLanguage(data as unknown as DbLanguage) : null
}

/**
 * Récupère un langage par son slug
 */
export async function getLanguageBySlug(slug: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage avec le slug ${slug}:`, error)
    throw error
  }

  // Utiliser une assertion de type pour résoudre le problème de compatibilité
  return data ? dbToLanguage(data as unknown as DbLanguage) : null
}

/**
 * Récupère les langages les plus populaires
 */
export async function getPopularLanguages(limit = 5) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("languages")
    .select("*")
    .order("usage_rate", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Erreur lors de la récupération des langages populaires:", error)
    throw error
  }

  // Utiliser une assertion de type pour résoudre le problème de compatibilité
  return data ? data.map((item: any) => dbToLanguage(item as unknown as DbLanguage)) : []
}

/**
 * Récupère les langages récemment ajoutés
 */
export async function getRecentLanguages(limit = 5) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from("languages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Erreur lors de la récupération des langages récents:", error)
    throw error
  }

  // Utiliser une assertion de type pour résoudre le problème de compatibilité
  return data ? data.map((item: any) => dbToLanguage(item as unknown as DbLanguage)) : []
}
