import { createServerSupabaseClient } from "@/lib/supabase"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"

// Définir le type pour les valeurs de type de langage
type LanguageType = "Frontend" | "Backend" | "Fullstack" | "Mobile" | "Data" | "Business"

// Définir une interface pour les données brutes de la base de données
interface LanguageRecord {
  id: string | number
  name: string
  slug?: string
  logo_path?: string
  short_description?: string
  type?: string
  used_for?: string
  usage_rate?: number
  year_created?: number
  popular_frameworks?: string[]
  strengths?: string[]
  difficulty?: number
  is_open_source?: boolean
  current_version?: string
  last_updated?: string
  tools?: any
  license?: string
  created_at?: string
  updated_at?: string
  [key: string]: any // Pour les propriétés supplémentaires non listées
}

/**
 * Vérifie si une chaîne est un type de langage valide
 */
function isValidLanguageType(type: string | undefined): type is LanguageType {
  if (!type) return false
  return ["Frontend", "Backend", "Fullstack", "Mobile", "Data", "Business"].includes(type)
}

/**
 * Convertit un enregistrement de base de données en objet Language
 * @param record - L'enregistrement de la base de données
 * @returns Un objet Language ou null si l'enregistrement est invalide
 */
function dbToLanguage(record: LanguageRecord | null): Language | null {
  if (!record || !record.id || !record.name) {
    return null
  }

  // Vérifier et convertir le type
  const languageType: LanguageType | undefined = isValidLanguageType(record.type)
    ? (record.type as LanguageType)
    : undefined

  return {
    id: record.id,
    name: record.name,
    slug: record.slug,

    // Propriétés en camelCase
    logo: record.logo_path,
    shortDescription: record.short_description,
    type: languageType,
    usedFor: record.used_for,
    usageRate: record.usage_rate,
    createdYear: record.year_created,
    popularFrameworks: record.popular_frameworks || [],
    strengths: record.strengths || [],
    difficulty: record.difficulty as 1 | 2 | 3 | 4 | 5 | undefined,
    isOpenSource: record.is_open_source,
    currentVersion: record.current_version,
    lastUpdated: record.last_updated,

    // Propriétés en snake_case
    logo_path: record.logo_path,
    short_description: record.short_description,
    used_for: record.used_for,
    usage_rate: record.usage_rate,
    year_created: record.year_created,
    popular_frameworks: record.popular_frameworks || [],
    is_open_source: record.is_open_source,
    current_version: record.current_version,
    last_updated: record.last_updated,

    // Autres propriétés
    tools: record.tools,
    license: record.license,
    created_at: record.created_at,
    updated_at: record.updated_at,
  }
}

/**
 * Récupère un langage par son slug
 * @param slug - Le slug ou l'identifiant du langage
 * @returns Le langage trouvé ou null
 */
export async function getLanguageBySlug(slug: string): Promise<Language | null> {
  try {
    console.log("Recherche du langage avec le slug:", slug)

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      console.error("Client Supabase non initialisé")
      return null
    }

    // D'abord, essayez de trouver par slug
    let { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

    // Si aucun résultat, essayez de trouver par ID
    if (!data && !error) {
      console.log("Aucun langage trouvé avec ce slug, essai avec l'ID")
      const { data: dataById, error: errorById } = await supabase.from("languages").select("*").eq("id", slug).single()

      data = dataById
      error = errorById
    }

    // Si toujours aucun résultat, essayez de trouver par nom transformé en slug
    if (!data && !error) {
      console.log("Aucun langage trouvé avec cet ID, essai avec le nom")
      const { data: allLanguages } = await supabase.from("languages").select("*")

      if (allLanguages) {
        // Recherche d'un langage dont le nom transformé en slug correspond
        const matchingLanguage = allLanguages.find((lang) => {
          const nameSlug = lang.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
          return nameSlug === slug
        })

        if (matchingLanguage) {
          console.log("Langage trouvé par correspondance de nom:", matchingLanguage.name)
          data = matchingLanguage
        }
      }
    }

    if (error) {
      console.error("Error fetching language by slug:", error)
      return null
    }

    // Convertir les données en format camelCase
    return data ? dbToLanguage(data) : null
  } catch (error) {
    console.error("Error fetching language by slug:", error)
    return null
  }
}

/**
 * Récupère la liste des langages avec filtrage et tri
 */
export async function getLanguages({
  type,
  sort,
  openSource,
  search,
}: {
  type?: string
  sort?: string
  openSource?: string
  search?: string
} = {}): Promise<Language[]> {
  try {
    const supabase = createServerSupabaseClient()

    if (!supabase) {
      console.error("Client Supabase non initialisé")
      return []
    }

    // Construire la requête
    let query = supabase.from("languages").select("*")

    // Appliquer les filtres
    if (type && type !== "all") {
      query = query.eq("type", type)
    }

    if (openSource === "true") {
      query = query.eq("is_open_source", true)
    }

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Appliquer le tri
    switch (sort) {
      case "name":
        query = query.order("name", { ascending: true })
        break
      case "year":
        query = query.order("year_created", { ascending: false })
        break
      case "usage":
        query = query.order("usage_rate", { ascending: false })
        break
      default:
        query = query.order("name", { ascending: true })
    }

    // Exécuter la requête
    const { data, error } = await query

    if (error) {
      console.error("Erreur lors de la récupération des langages:", error)
      return []
    }

    // Convertir les données en format camelCase et filtrer les valeurs nulles
    return (data || []).map((record) => dbToLanguage(record)).filter((lang): lang is Language => lang !== null)
  } catch (error) {
    console.error("Exception dans getLanguages:", error)
    return []
  }
}

/**
 * Récupère les frameworks associés à un langage
 */
export async function getFrameworksByLanguageId(languageId: number | string): Promise<Library[]> {
  try {
    console.log("Récupération des frameworks pour le langage ID:", languageId)

    // Si languageId est undefined ou null, retourner un tableau vide
    if (languageId === undefined || languageId === null) {
      console.log("ID de langage non défini, retour d'un tableau vide")
      return []
    }

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      console.error("Client Supabase non initialisé")
      return []
    }

    // Récupérer les bibliothèques/frameworks depuis la table libraries
    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .eq("language_id", languageId)
      .order("popularity", { ascending: false })

    if (error) {
      console.error("Error fetching libraries for language:", error)
      return []
    }

    console.log(`Trouvé ${data?.length || 0} frameworks dans la table libraries`)

    // Si des bibliothèques sont trouvées, les retourner
    if (data && data.length > 0) {
      return data.map((lib) => ({
        id: lib.id,
        name: lib.name,
        language_id: lib.language_id,
        description: lib.description || `Framework populaire pour ${lib.name}`,
        website: lib.website || lib.official_website,
        github_url: lib.github_url,
        documentation_url: lib.documentation_url,
        logo_path: lib.logo_path,
        popularity: lib.popularity,
        is_open_source: lib.is_open_source,
        features: lib.features || [],
        unique_selling_point: lib.unique_selling_point,
        best_for: lib.best_for,
        used_for: lib.used_for,
        version: lib.version,
      }))
    }

    // Si aucune bibliothèque n'est trouvée, essayer de récupérer depuis popular_frameworks
    console.log("Aucune bibliothèque trouvée, essai avec popular_frameworks")
    const { data: langData, error: langError } = await supabase
      .from("languages")
      .select("popular_frameworks")
      .eq("id", languageId)
      .single()

    if (langError) {
      console.error("Error fetching language for frameworks:", langError)
      return []
    }

    // Si le langage a des frameworks populaires, les transformer en objets
    if (langData && langData.popular_frameworks && Array.isArray(langData.popular_frameworks)) {
      console.log(`Trouvé ${langData.popular_frameworks.length} frameworks dans popular_frameworks`)
      return langData.popular_frameworks.map((name, index) => ({
        id: `${languageId}-${index}`,
        name,
        description: `Framework populaire pour ${name}`,
        language_id: languageId,
      }))
    }

    console.log("Aucun framework trouvé")
    return []
  } catch (error) {
    console.error("Error in getFrameworksByLanguageId:", error)
    return []
  }
}

