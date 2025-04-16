import { createServerClient } from "@/lib/supabase/server"
import type { Library } from "@/types/models/library"
import { dbToLibrary } from "../mapping/library-mapping"
import type { DbLibrary } from "@/types/database/library"
import { libraryToDb } from "../mapping/library-mapping"

// Options pour la récupération des bibliothèques
export interface GetLibrariesOptions {
  page?: number
  pageSize?: number
  search?: string
  languageId?: number
  technologyType?: string
}

/**
 * Récupère la liste des bibliothèques avec pagination et filtres
 */
export async function getLibraries(options: GetLibrariesOptions = {}) {
  const { page = 1, pageSize = 10, search, languageId, technologyType } = options

  const supabase = createServerClient()

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize

  // Construire la requête de base
  let query = supabase.from("libraries").select("*", { count: "exact" })

  // Appliquer les filtres si nécessaire
  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  if (languageId !== undefined) {
    query = query.eq("language_id", languageId)
  }

  if (technologyType) {
    query = query.eq("technology_type", technologyType)
  }

  // Exécuter la requête avec pagination
  const { data, error, count } = await query.range(offset, offset + pageSize - 1).order("name")

  if (error) {
    console.error("Erreur lors de la récupération des bibliothèques:", error)
    throw error
  }

  // Convertir les données avec la fonction de mapping
  const mappedData = data ? data.map((item) => dbToLibrary(item as DbLibrary)) : []

  return {
    data: mappedData,
    totalCount: count || 0,
    page,
    pageSize,
  }
}

/**
 * Récupère les frameworks associés à un langage spécifique
 * @param languageId ID du langage
 * @returns Liste des frameworks
 */
export async function getFrameworksByLanguageId(languageId: number): Promise<Library[]> {
  try {
    const supabase = createServerClient()

    // Récupérer les bibliothèques de type "framework" associées au langage
    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .eq("language_id", languageId)
      .eq("technology_type", "framework")
      .order("name")

    if (error) {
      console.error(`Erreur lors de la récupération des frameworks pour le langage ${languageId}:`, error)
      return []
    }

    // Convertir les données avec la fonction de mapping
    return data ? data.map((item) => dbToLibrary(item as DbLibrary)) : []
  } catch (error) {
    console.error(`Erreur lors de la récupération des frameworks pour le langage ${languageId}:`, error)
    return []
  }
}

/**
 * Récupère une bibliothèque par son ID
 */
export async function getLibraryById(id: number): Promise<Library | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("libraries").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Code pour "No rows returned"
        return null
      }
      console.error(`Erreur lors de la récupération de la bibliothèque ${id}:`, error)
      return null
    }

    if (!data) return null

    return dbToLibrary(data as DbLibrary)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la bibliothèque ${id}:`, error)
    return null
  }
}

/**
 * Récupère une bibliothèque par son slug
 */
export async function getLibraryBySlug(slug: string): Promise<Library | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("libraries").select("*").eq("slug", slug).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Code pour "No rows returned"
        return null
      }
      console.error(`Erreur lors de la récupération de la bibliothèque avec le slug ${slug}:`, error)
      return null
    }

    if (!data) return null

    return dbToLibrary(data as DbLibrary)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la bibliothèque avec le slug ${slug}:`, error)
    return null
  }
}

/**
 * Crée une nouvelle bibliothèque
 */
export async function createLibrary(library: Partial<Library>): Promise<Library> {
  const supabase = createServerClient()

  // S'assurer que le slug est généré si non fourni
  if (!library.slug && library.name) {
    library.slug = library.name.toLowerCase().replace(/\s+/g, "-")
  }

  const dbData = libraryToDb(library)

  // Vérifier que les champs obligatoires sont présents
  if (!dbData.name) {
    throw new Error("Le nom de la bibliothèque est obligatoire")
  }

  if (!dbData.slug) {
    throw new Error("Le slug de la bibliothèque est obligatoire")
  }

  // Créer un objet d'insertion avec les champs obligatoires garantis
  const insertData = {
    name: dbData.name,
    slug: dbData.slug,
    // Fournir des valeurs par défaut pour les autres champs obligatoires
    language_id: dbData.language_id || null,
    technology_type: dbData.technology_type || null,
    created_at: dbData.created_at || new Date().toISOString(),
    // Ajouter les autres champs optionnels
    description: dbData.description,
    website_url: dbData.website_url,
    github_url: dbData.github_url,
    logo_path: dbData.logo_path,
    is_popular: dbData.is_popular,
    updated_at: dbData.updated_at,
    documentation_url: dbData.documentation_url,
    best_for: dbData.best_for,
    category: dbData.category,
    stars: dbData.stars,
    last_release: dbData.last_release,
    license: dbData.license,
    features: dbData.features,
    version: dbData.version,
    subtype: dbData.subtype,
    popularity: dbData.popularity,
    is_open_source: dbData.is_open_source,
    official_website: dbData.official_website,
    unique_selling_point: dbData.unique_selling_point,
    used_for: dbData.used_for,
  }

  const { data, error } = await supabase.from("libraries").insert(insertData).select().single()

  if (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    throw error
  }

  return dbToLibrary(data as DbLibrary)
}

/**
 * Met à jour une bibliothèque existante
 */
export async function updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  const supabase = createServerClient()
  const dbData = libraryToDb(library)

  // Créer un objet de mise à jour qui ne contient que les champs à modifier
  // et s'assurer que tous les champs ont les types attendus par Supabase
  const updateData: Record<string, any> = {}

  // N'ajouter que les champs qui sont présents dans dbData
  if (dbData.name !== undefined) updateData.name = dbData.name
  if (dbData.slug !== undefined) updateData.slug = dbData.slug
  if (dbData.description !== undefined) updateData.description = dbData.description
  if (dbData.language_id !== undefined) updateData.language_id = dbData.language_id
  if (dbData.technology_type !== undefined) updateData.technology_type = dbData.technology_type
  if (dbData.website_url !== undefined) updateData.website_url = dbData.website_url
  if (dbData.github_url !== undefined) updateData.github_url = dbData.github_url
  if (dbData.logo_path !== undefined) updateData.logo_path = dbData.logo_path
  if (dbData.is_popular !== undefined) updateData.is_popular = dbData.is_popular
  if (dbData.updated_at !== undefined) updateData.updated_at = dbData.updated_at
  if (dbData.documentation_url !== undefined) updateData.documentation_url = dbData.documentation_url
  if (dbData.best_for !== undefined) updateData.best_for = dbData.best_for
  if (dbData.category !== undefined) updateData.category = dbData.category
  if (dbData.stars !== undefined) updateData.stars = dbData.stars
  if (dbData.last_release !== undefined) updateData.last_release = dbData.last_release
  if (dbData.license !== undefined) updateData.license = dbData.license
  if (dbData.features !== undefined) updateData.features = dbData.features
  if (dbData.version !== undefined) updateData.version = dbData.version
  if (dbData.subtype !== undefined) updateData.subtype = dbData.subtype
  if (dbData.popularity !== undefined) updateData.popularity = dbData.popularity
  if (dbData.is_open_source !== undefined) updateData.is_open_source = dbData.is_open_source
  if (dbData.official_website !== undefined) updateData.official_website = dbData.official_website
  if (dbData.unique_selling_point !== undefined) updateData.unique_selling_point = dbData.unique_selling_point
  if (dbData.used_for !== undefined) updateData.used_for = dbData.used_for

  // Ajouter le timestamp de mise à jour s'il n'est pas déjà défini
  if (!updateData.updated_at) {
    updateData.updated_at = new Date().toISOString()
  }

  const { data, error } = await supabase.from("libraries").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error(`Erreur lors de la mise à jour de la bibliothèque ${id}:`, error)
    throw error
  }

  return dbToLibrary(data as DbLibrary)
}

/**
 * Supprime une bibliothèque
 */
export async function deleteLibrary(id: number): Promise<boolean> {
  const supabase = createServerClient()
  const { error } = await supabase.from("libraries").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression de la bibliothèque ${id}:`, error)
    throw error
  }

  return true
}
