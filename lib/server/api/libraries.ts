/**
 * @deprecated Ce fichier est déprécié. Utilisez les modules spécialisés à la place.
 *
 * - Pour récupérer toutes les bibliothèques: import { getAllLibraries } from "@/lib/server/api/libraries"
 * - Pour récupérer une bibliothèque par ID: import { getLibraryById } from "@/lib/server/api/libraries"
 * - Pour créer une bibliothèque: import { createLibrary } from "@/lib/server/api/libraries"
 * - Pour mettre à jour une bibliothèque: import { updateLibrary } from "@/lib/server/api/libraries"
 * - Pour supprimer une bibliothèque: import { deleteLibrary } from "@/lib/server/api/libraries"
 * - Pour récupérer les bibliothèques par langage: import { getLibrariesByLanguageId } from "@/lib/server/api/libraries"
 * - Pour rechercher des bibliothèques: import { searchLibraries } from "@/lib/server/api/libraries"
 */

// Réexporter tout depuis le point d'entrée pour maintenir la compatibilité
export * from "./libraries/index"

import { createServerClient } from "@/lib/supabase/server"
import { dbToLibrary } from "@/lib/server/mapping/library-mapping"
import type { Library } from "@/types/models/library"
import type { DbLibrary } from "@/types/database/library"

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
 * @throws {Error} Si une erreur survient lors de la création
 */
export async function createLibrary(library: Omit<Library, "id">): Promise<Library> {
  try {
    const supabase = createServerClient()

    // Vérifier que le nom est défini (obligatoire)
    if (!library.name) {
      throw new Error("Le nom de la bibliothèque est obligatoire")
    }

    // Convertir en format DB
    const dbLibraryPartial: Partial<DbLibrary> = {}

    // Mapper les propriétés
    if (library.name !== undefined) dbLibraryPartial.name = library.name
    if (library.languageId !== undefined) dbLibraryPartial.language_id = library.languageId
    if (library.description !== undefined) dbLibraryPartial.description = library.description
    if (library.officialWebsite !== undefined) dbLibraryPartial.official_website = library.officialWebsite
    if (library.githubUrl !== undefined) dbLibraryPartial.github_url = library.githubUrl
    if (library.logoPath !== undefined) dbLibraryPartial.logo_path = library.logoPath
    if (library.popularity !== undefined) dbLibraryPartial.popularity = library.popularity
    if (library.isOpenSource !== undefined) dbLibraryPartial.is_open_source = library.isOpenSource
    if (library.createdAt !== undefined) dbLibraryPartial.created_at = library.createdAt
    if (library.updatedAt !== undefined) dbLibraryPartial.updated_at = library.updatedAt
    if (library.features !== undefined) dbLibraryPartial.features = library.features
    if (library.uniqueSellingPoint !== undefined) dbLibraryPartial.unique_selling_point = library.uniqueSellingPoint
    if (library.bestFor !== undefined) dbLibraryPartial.best_for = library.bestFor
    if (library.usedFor !== undefined) dbLibraryPartial.used_for = library.usedFor
    if (library.documentationUrl !== undefined) dbLibraryPartial.documentation_url = library.documentationUrl
    if (library.version !== undefined) dbLibraryPartial.version = library.version
    if (library.technologyType !== undefined) dbLibraryPartial.technology_type = library.technologyType
    if (library.subtype !== undefined) dbLibraryPartial.subtype = library.subtype
    if (library.slug !== undefined) dbLibraryPartial.slug = library.slug

    // Créer un objet avec les propriétés typées correctement pour Supabase
    const insertData = {
      name: dbLibraryPartial.name!, // Propriété obligatoire (l'exclamation est sûre car nous avons vérifié plus haut)
      slug: dbLibraryPartial.slug || null,
      language_id: dbLibraryPartial.language_id || null,
      description: dbLibraryPartial.description || null,
      official_website: dbLibraryPartial.official_website || null,
      github_url: dbLibraryPartial.github_url || null,
      logo_path: dbLibraryPartial.logo_path || null,
      popularity: dbLibraryPartial.popularity || null,
      is_open_source: dbLibraryPartial.is_open_source || null,
      created_at: dbLibraryPartial.created_at || null,
      updated_at: dbLibraryPartial.updated_at || null,
      features: dbLibraryPartial.features || null,
      unique_selling_point: dbLibraryPartial.unique_selling_point || null,
      best_for: dbLibraryPartial.best_for || null,
      used_for: dbLibraryPartial.used_for || null,
      documentation_url: dbLibraryPartial.documentation_url || null,
      version: dbLibraryPartial.version || null,
      technology_type: dbLibraryPartial.technology_type || null,
      subtype: dbLibraryPartial.subtype || null,
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

/**
 * Met à jour une bibliothèque existante
 * @param id ID de la bibliothèque à mettre à jour
 * @param library Données partielles de la bibliothèque à mettre à jour
 * @returns La bibliothèque mise à jour
 * @throws {Error} Si une erreur survient lors de la mise à jour
 */
export async function updateLibrary(id: number, library: Partial<Library>): Promise<Library> {
  try {
    const supabase = createServerClient()

    // Convertir en format DB
    const dbLibrary: Partial<DbLibrary> = {}

    // Mapper uniquement les propriétés définies
    if (library.name !== undefined) dbLibrary.name = library.name
    if (library.languageId !== undefined) dbLibrary.language_id = library.languageId
    if (library.description !== undefined) dbLibrary.description = library.description
    if (library.officialWebsite !== undefined) dbLibrary.official_website = library.officialWebsite
    if (library.githubUrl !== undefined) dbLibrary.github_url = library.githubUrl
    if (library.logoPath !== undefined) dbLibrary.logo_path = library.logoPath
    if (library.popularity !== undefined) dbLibrary.popularity = library.popularity
    if (library.isOpenSource !== undefined) dbLibrary.is_open_source = library.isOpenSource
    if (library.createdAt !== undefined) dbLibrary.created_at = library.createdAt
    if (library.updatedAt !== undefined) dbLibrary.updated_at = library.updatedAt
    if (library.features !== undefined) dbLibrary.features = library.features
    if (library.uniqueSellingPoint !== undefined) dbLibrary.unique_selling_point = library.uniqueSellingPoint
    if (library.bestFor !== undefined) dbLibrary.best_for = library.bestFor
    if (library.usedFor !== undefined) dbLibrary.used_for = library.usedFor
    if (library.documentationUrl !== undefined) dbLibrary.documentation_url = library.documentationUrl
    if (library.version !== undefined) dbLibrary.version = library.version
    if (library.technologyType !== undefined) dbLibrary.technology_type = library.technologyType
    if (library.subtype !== undefined) dbLibrary.subtype = library.subtype
    if (library.slug !== undefined) dbLibrary.slug = library.slug

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
    const { data, error } = await supabase.from("libraries").select("*").eq("language_id", languageId).order("name")

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
    const { data, error } = await supabase.from("libraries").select("*").ilike("name", `%${query}%`).order("name")

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
