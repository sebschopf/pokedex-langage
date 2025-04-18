import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary, libraryToDb } from "@/lib/server/mapping/library-mapping"
import type { Library } from "@/types/models/library"
import type { Database } from "@/types/database-types"

// Type pour les données de bibliothèque retournées par Supabase
type DbLibraryRow = Database["public"]["Tables"]["libraries"]["Row"]

/**
 * Récupère toutes les bibliothèques
 * @returns Une liste de bibliothèques
 */
export async function getLibraries() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("libraries").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des bibliothèques:", error)
      return { data: [], error }
    }

    // Utiliser la fonction de mappage pour convertir les données de la base de données en modèles d'application
    return { data: data.map((item) => dbToLibrary(item)), error: null }
  } catch (error) {
    console.error("Exception lors de la récupération des bibliothèques:", error)
    return { data: [], error }
  }
}

/**
 * Récupère une bibliothèque par son ID
 * @param id ID de la bibliothèque
 * @returns La bibliothèque ou null si non trouvée
 */
export async function getLibraryById(id: number): Promise<Library | null> {
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

  // Utiliser la fonction de mappage pour convertir les données de la base de données en modèle d'application
  return dbToLibrary(data)
}

/**
 * Récupère une bibliothèque par son slug
 * @param slug Slug de la bibliothèque
 * @returns La bibliothèque ou null si non trouvée
 */
export async function getLibraryBySlug(slug: string): Promise<Library | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("libraries").select("*").eq("slug", slug).single()

  if (error) {
    if (error.code === "PGRST116") {
      // Code d'erreur pour "No rows found"
      return null
    }
    console.error(`Erreur lors de la récupération de la bibliothèque avec le slug ${slug}:`, error)
    throw error
  }

  // Utiliser la fonction de mappage pour convertir les données de la base de données en modèle d'application
  return dbToLibrary(data)
}

/**
 * Crée une nouvelle bibliothèque
 * @param library Données de la bibliothèque à créer
 * @returns La bibliothèque créée
 */
export async function createLibrary(library: Omit<Library, "id">): Promise<Library> {
  const supabase = createServerClient()

  // Convertir le modèle d'application en modèle de base de données
  const dbLibrary = libraryToDb(library as Library)

  // Supprimer l'ID pour permettre à Supabase de générer un nouvel ID
  delete dbLibrary.id

  const { data, error } = await supabase.from("libraries").insert(dbLibrary).select().single()

  if (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    throw error
  }

  return dbToLibrary(data)
}

/**
 * Met à jour une bibliothèque existante
 * @param id ID de la bibliothèque à mettre à jour
 * @param library Données partielles de la bibliothèque à mettre à jour
 * @returns La bibliothèque mise à jour
 */
export async function updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  const supabase = createServerClient()

  // Récupérer la bibliothèque existante
  const existingLibrary = await getLibraryById(id)

  if (!existingLibrary) {
    throw new Error(`Bibliothèque avec l'ID ${id} non trouvée`)
  }

  // Fusionner les données existantes avec les nouvelles données
  const mergedLibrary = { ...existingLibrary, ...library }

  // Convertir le modèle d'application en modèle de base de données
  const dbLibrary = libraryToDb(mergedLibrary)

  const { data, error } = await supabase.from("libraries").update(dbLibrary).eq("id", id).select().single()

  if (error) {
    console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
    throw error
  }

  return dbToLibrary(data)
}

/**
 * Supprime une bibliothèque
 * @param id ID de la bibliothèque à supprimer
 */
export async function deleteLibrary(id: number): Promise<void> {
  const supabase = createServerClient()

  const { error } = await supabase.from("libraries").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
    throw error
  }
}

/**
 * Récupère les frameworks associés à un langage
 * @param languageId ID du langage
 * @returns Une liste de frameworks
 */
export async function getFrameworksByLanguageId(languageId: number): Promise<Library[]> {
  try {
    const supabase = createServerClient()

    // Vérifier d'abord si la relation est directe via language_id
    const { data: directData, error: directError } = await supabase
      .from("libraries")
      .select("*")
      .eq("language_id", languageId)
      .order("name")

    // Si la requête directe a réussi et retourné des données
    if (!directError && directData && directData.length > 0) {
      console.log(`Frameworks trouvés directement pour le langage ${languageId}:`, directData.length)
      return directData.map((item) => dbToLibrary(item))
    }

    // Si la requête directe a échoué ou n'a pas retourné de données, essayer avec la table de jointure
    console.log(`Tentative avec la table de jointure pour le langage ${languageId}`)

    const { data: joinData, error: joinError } = await supabase
      .from("library_languages")
      .select("library_id")
      .eq("language_id", languageId)

    if (joinError) {
      console.error(`Erreur lors de la récupération des relations pour le langage ${languageId}:`, joinError)
      return []
    }

    if (!joinData || joinData.length === 0) {
      console.log(`Aucun framework trouvé pour le langage ${languageId}`)
      return []
    }

    // Récupérer les bibliothèques correspondant aux IDs trouvés
    const libraryIds = joinData.map((item) => item.library_id)
    const { data: librariesData, error: librariesError } = await supabase
      .from("libraries")
      .select("*")
      .in("id", libraryIds)
      .order("name")

    if (librariesError) {
      console.error(`Erreur lors de la récupération des bibliothèques pour les IDs ${libraryIds}:`, librariesError)
      return []
    }

    console.log(`Frameworks trouvés via jointure pour le langage ${languageId}:`, librariesData?.length || 0)

    // Utiliser la fonction de mappage pour convertir les données de la base de données en modèles d'application
    return librariesData ? librariesData.map((item) => dbToLibrary(item)) : []
  } catch (error) {
    console.error(`Exception lors de la récupération des frameworks pour le langage ${languageId}:`, error)
    return []
  }
}
