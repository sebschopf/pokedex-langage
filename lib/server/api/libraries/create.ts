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

    // Vérifier que name est bien défini (obligatoire pour Supabase)
    if (!dbLibrary.name) {
      throw new Error("Le champ 'name' est obligatoire pour créer une bibliothèque")
    }

    // Créer un objet avec les propriétés typées correctement pour Supabase
    const insertData = {
      name: dbLibrary.name, // Propriété obligatoire
      slug: dbLibrary.slug || null,
      language_id: dbLibrary.language_id || null,
      description: dbLibrary.description || null,
      official_website: dbLibrary.official_website || null,
      github_url: dbLibrary.github_url || null,
      logo_path: dbLibrary.logo_path || null,
      popularity: dbLibrary.popularity || null,
      is_open_source: dbLibrary.is_open_source || null,
      created_at: dbLibrary.created_at || null,
      updated_at: dbLibrary.updated_at || null,
      features: dbLibrary.features || null,
      unique_selling_point: dbLibrary.unique_selling_point || null,
      best_for: dbLibrary.best_for || null,
      used_for: dbLibrary.used_for || null,
      documentation_url: dbLibrary.documentation_url || null,
      version: dbLibrary.version || null,
      technology_type: dbLibrary.technology_type || null,
      subtype: dbLibrary.subtype || null,
    }

    const { data, error } = await supabase.from("libraries").insert(insertData).select().single()

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
