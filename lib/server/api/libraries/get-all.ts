import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary } from "@/lib/server/mapping/library-mapping"
import type { Library } from "@/types/models/library"

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
