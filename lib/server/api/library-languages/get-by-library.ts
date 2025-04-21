import { createServerClient } from "@/lib/supabase/server"

/**
 * Récupère les langages associés à une bibliothèque ou un outil
 * @param libraryId ID de la bibliothèque ou de l'outil
 * @returns Liste des langages associés avec leur statut (primaire ou non)
 */
export async function getLanguagesForLibrary(libraryId: number) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("library_languages")
      .select(`
        language_id,
        primary_language,
        languages:language_id (
          id,
          name,
          slug,
          logo_path
        )
      `)
      .eq("library_id", libraryId)

    if (error) {
      console.error(`Erreur lors de la récupération des langages pour la bibliothèque ${libraryId}:`, error)
      throw error
    }

    return data.map((item) => ({
      ...item.languages,
      isPrimary: item.primary_language,
    }))
  } catch (error) {
    console.error(`Exception lors de la récupération des langages pour la bibliothèque ${libraryId}:`, error)
    return []
  }
}
