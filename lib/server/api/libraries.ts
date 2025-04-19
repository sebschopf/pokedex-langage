import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary, libraryToDb, hasRequiredLibraryFields } from "@/lib/server/mapping/library-mapping"
import type { Library } from "@/types/models/library"
import { filterNonNullable } from "@/utils/array"

/**
 * Récupère toutes les bibliothèques
 * @returns Liste des bibliothèques
 */
export async function getAllLibraries(): Promise<Library[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("libraries").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des bibliothèques:", error)
      return []
    }

    return data.map(dbToLibrary)
  } catch (error) {
    console.error("Exception lors de la récupération des bibliothèques:", error)
    return []
  }
}

/**
 * Récupère une bibliothèque par son ID
 * @param id ID de la bibliothèque
 * @returns La bibliothèque ou null si non trouvée
 */
export async function getLibraryById(id: number): Promise<Library | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("libraries").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Code d'erreur pour "No rows found"
        return null
      }
      console.error(`Erreur lors de la récupération de la bibliothèque avec l'ID ${id}:`, error)
      throw error
    }

    return dbToLibrary(data)
  } catch (error) {
    console.error(`Exception lors de la récupération de la bibliothèque avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Crée une nouvelle bibliothèque
 * @param library Données de la bibliothèque à créer
 * @returns La bibliothèque créée
 * @throws {Error} Si les champs obligatoires sont manquants ou si une erreur survient
 */
export async function createLibrary(library: Omit<Library, "id">): Promise<Library> {
  // Vérifier les champs obligatoires
  if (!hasRequiredLibraryFields(library)) {
    throw new Error("Les champs 'name' et 'slug' sont obligatoires pour créer une bibliothèque")
  }

  try {
    const supabase = createServerClient()
    
    // Convertir en format DB
    const dbLibrary = libraryToDb(library)
    
    const { data, error } = await supabase.from("libraries").insert(dbLibrary).select().single()
    
    if (error) {
      console.error("Erreur lors de la création de la bibliothèque:", error)
      throw error
    }
    
    return dbToLibrary(data)
  } catch (error) {
    console.error("Exception lors de la création de la bibliothèque:", error)
    throw error
  }
}

/**
 * Met à jour une bibliothèque existante
 * @param id ID de la bibliothèque à mettre à jour
 * @param library Données partielles de la bibliothèque à mettre à jour
 * @returns La bibliothèque mise à jour
 * @throws {Error} Si aucune donnée n'est fournie ou si une erreur survient
 */
export async function updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  try {
    const supabase = createServerClient()
    
    // Convertir en format DB
    const dbLibrary = libraryToDb(library)
    
    // Vérifier qu'il y a des données à mettre à jour
    if (Object.keys(dbLibrary).length === 0) {
      throw new Error("Aucune donnée fournie pour la mise à jour")
    }
    
    const { data, error } = await supabase.from("libraries").update(dbLibrary).eq("id", id).select().single()
    
    if (error) {
      console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
      throw error
    }
    
    return dbToLibrary(data)
  } catch (error) {
    console.error(`Exception lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
    throw error
  }
}

/**
 * Supprime une bibliothèque
 * @param id ID de la bibliothèque à supprimer
 * @returns true si la suppression a réussi
 * @throws {Error} Si une erreur survient lors de la suppression
 */
export async function deleteLibrary(id: number): Promise<boolean> {
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("libraries").delete().eq("id", id)
    
    if (error) {
      console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
      throw error
    }
    
    return true
  } catch (error) {
    console.error(`Exception lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
    throw error
  }
}

/**
 * Récupère les bibliothèques associées à un langage
 * @param languageId ID du langage
 * @returns Liste des bibliothèques associées au langage
 */
export async function getLibrariesByLanguageId(languageId: number): Promise<Library[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .eq("language_id", languageId)
      .order("name")

    if (error) {
      console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
      return []
    }

    return data.map(dbToLibrary)
  } catch (error) {
    console.error(`Exception lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
    return []
  }
}

/**
 * Recherche des bibliothèques par nom
 * @param query Terme de recherche
 * @returns Liste des bibliothèques correspondant à la recherche
 */
export async function searchLibraries(query: string): Promise<Library[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .ilike("name", `%${query}%`)
      .order("name")

    if (error) {
      console.error(`Erreur lors de la recherche de bibliothèques avec le terme "${query}":`, error)
      return []
    }

    return data.map(dbToLibrary)
  } catch (error) {
    console.error(`Exception lors de la recherche de bibliothèques avec le terme "${query}":`, error)
    return []
  }
}