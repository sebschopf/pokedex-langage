import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary } from "@/lib/server/mapping/library-mapping"
import type { Library } from "@/types/models/library"

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
