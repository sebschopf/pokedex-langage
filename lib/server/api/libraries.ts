import { cache } from "react"
import { createServerSupabaseClient } from "../supabase/client"
import type { Library } from "@/types/models"
import { dbToLibrary } from "../mapping/library-mapping"
import type { DbLibrary } from "@/types/database/library"

// Colonnes nécessaires pour les bibliothèques/frameworks
const LIBRARY_COLUMNS =
  "id, name, description, technology_type, used_for, features, official_website, unique_selling_point, best_for, version, documentation_url, github_url, sub_type, popularity, created_at, updated_at, is_open_source, language_id, logo_path"

/**
 * Récupère les données brutes des bibliothèques depuis Supabase
 * @param libraryIds IDs des bibliothèques à récupérer
 * @returns Données brutes des bibliothèques
 */
async function fetchLibrariesData(libraryIds: number[]): Promise<DbLibrary[]> {
  const supabase = createServerSupabaseClient()

  const { data: libraries, error: librariesError } = await supabase
    .from("libraries")
    .select(LIBRARY_COLUMNS)
    .in("id", libraryIds)
    .order("name")

  if (librariesError) {
    console.error(`Erreur lors de la récupération des bibliothèques:`, librariesError)
    return []
  }

  return libraries as DbLibrary[]
}

/**
 * Récupère les IDs des bibliothèques associées à un langage
 * @param languageId ID du langage
 * @returns Liste des IDs de bibliothèques
 */
async function fetchLibraryIdsByLanguageId(languageId: number): Promise<number[]> {
  const supabase = createServerSupabaseClient()

  const { data: libraryLanguages, error: libraryLanguagesError } = await supabase
    .from("library_languages")
    .select("library_id")
    .eq("language_id", languageId)

  if (libraryLanguagesError) {
    console.error(
      `Erreur lors de la récupération des relations bibliothèque-langage pour le langage ${languageId}:`,
      libraryLanguagesError,
    )
    return []
  }

  if (!libraryLanguages || libraryLanguages.length === 0) {
    return []
  }

  return libraryLanguages.map((item) => item.library_id)
}

/**
 * Récupère tous les frameworks associés à un langage
 * @param languageId ID du langage
 * @returns Liste des frameworks
 */
export const getFrameworksByLanguageId = cache(async (languageId: number): Promise<Library[]> => {
  try {
    // 1. Récupérer les IDs des bibliothèques
    const libraryIds = await fetchLibraryIdsByLanguageId(languageId)

    if (libraryIds.length === 0) {
      return []
    }

    // 2. Récupérer les données des bibliothèques
    const librariesData = await fetchLibrariesData(libraryIds)

    // 3. Transformer les données en objets Library
    return librariesData.map(dbToLibrary)
  } catch (error) {
    console.error(`Erreur lors de la récupération des frameworks pour le langage ${languageId}:`, error)
    return []
  }
})

// Autres fonctions du fichier libraries.ts...
