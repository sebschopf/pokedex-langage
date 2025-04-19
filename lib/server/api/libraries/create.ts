import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary } from "@/lib/server/mapping/library-mapping/db-to-library"
import { libraryToDbForInsert } from "@/lib/server/mapping/library-mapping/for-insert"
import type { Library } from "@/types/models/library"

/**
 * Crée une nouvelle bibliothèque
 * @param library Données de la bibliothèque à créer
 * @returns La bibliothèque créée
 * @throws {Error} Si les champs obligatoires sont manquants ou si une erreur survient
 */
export async function createLibrary(library: Omit<Library, "id">): Promise<Library> {
  try {
    const supabase = createServerClient()

    // Convertir en format DB avec les champs obligatoires garantis
    const dbLibrary = libraryToDbForInsert(library)

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
