import { getSupabaseServerClient } from "@/lib/server/supabase/client"
import type { Language } from "@/types/models"

interface GetLanguagesOptions {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  subtype?: string
  openSource?: boolean
  minUsage?: number
  sort?: string
}

export async function getLanguages(options: GetLanguagesOptions = {}) {
  const {
    page = 1,
    pageSize = 10,
    search = "",
    category = "",
    subtype = "",
    openSource,
    minUsage,
    sort = "name",
  } = options

  const supabase = getSupabaseServerClient()

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize

  // Construire la requête de base
  let query = supabase.from("languages").select("*", { count: "exact" })

  // Ajouter les filtres
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
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

  // Ajouter la pagination
  query = query.range(offset, offset + pageSize - 1)

  // Exécuter la requête
  const { data, error, count } = await query

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    throw new Error(`Erreur lors de la récupération des langages: ${error.message}`)
  }

  // Mapper les données pour correspondre au type Language
  const languages = data.map(mapDatabaseLanguageToModel)

  return {
    data: languages,
    totalCount: count || 0,
  }
}

// Fonction pour mapper les données de la base de données au modèle
function mapDatabaseLanguageToModel(dbLanguage: any): Language {
  return {
    id: dbLanguage.id,
    name: dbLanguage.name,
    description: dbLanguage.description,
    shortDescription: dbLanguage.short_description,
    logoPath: dbLanguage.logo_path,
    slug: dbLanguage.slug,
    type: dbLanguage.type,
    subtypes: dbLanguage.subtypes,
    usageRate: dbLanguage.usage_rate,
    yearCreated: dbLanguage.year_created,
    isOpenSource: dbLanguage.is_open_source,
    creator: dbLanguage.creator,
    // Ajouter d'autres champs selon votre modèle
  }
}
