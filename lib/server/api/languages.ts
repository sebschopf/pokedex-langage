import { createServerSupabaseClient } from "../supabase/client"
import { dbToLanguage } from "../mapping/language-mapping"
import type { Language } from "@/types/models"
import { languageToDb } from "../mapping/language-mapping"

/**
 * Récupère tous les langages de programmation
 * @returns Liste des langages triés par nom
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("languages").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des langages:", error)
      return []
    }

    // Utiliser la fonction de conversion pour normaliser les données
    return data.map(dbToLanguage)
  } catch (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return []
  }
}

/**
 * Récupère un langage par son ID
 * @param id ID du langage à récupérer
 * @returns Le langage ou null si non trouvé
 */
export async function getLanguageById(id: number): Promise<Language | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("languages").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération du langage avec l'ID ${id}:`, error)
      return null
    }

    return dbToLanguage(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération du langage avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Récupère un langage par son slug
 * @param slug Le slug du langage
 * @param skipCache Ignorer le cache et forcer une nouvelle requête (optionnel)
 * @returns Le langage ou null si non trouvé
 */
export async function getLanguageBySlug(slug: string, skipCache = false): Promise<Language | null> {
  try {
    // Validation du slug
    if (!slug) {
      throw new Error("Slug non défini ou invalide")
    }

    const supabase = createServerSupabaseClient()
    if (!supabase) {
      throw new Error("Client Supabase non initialisé")
    }

    // Récupérer le langage par son slug
    const { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Code d'erreur pour "No rows found"
        return null
      }
      throw new Error(`Erreur lors de la récupération du langage: ${error.message}`)
    }

    if (!data) {
      return null
    }

    // Convertir les données
    return dbToLanguage(data)
  } catch (error) {
    // Gestion structurée des erreurs
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue lors de la récupération du langage"

    console.error(`Erreur dans getLanguageBySlug: ${errorMessage}`, error)
    return null
  }
}

/**
 * Crée un nouveau langage de programmation
 * @param language Données du langage à créer (sans l'ID)
 * @returns Le langage créé ou null en cas d'erreur
 */
export async function createLanguage(language: Omit<Language, "id">): Promise<Language | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = languageToDb(language)

    const { data, error } = await supabase.from("languages").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création du langage:", error)
      return null
    }

    return dbToLanguage(data)
  } catch (error) {
    console.error("Erreur lors de la création du langage:", error)
    return null
  }
}

/**
 * Met à jour un langage existant
 * @param id ID du langage à mettre à jour
 * @param language Données partielles du langage à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateLanguage(id: number, language: Partial<Language>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = languageToDb(language)

    const { error } = await supabase
      .from("languages")
      .update({
        ...dbData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du langage avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du langage avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime un langage
 * @param id ID du langage à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteLanguage(id: number): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("languages").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression du langage avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression du langage avec l'ID ${id}:`, error)
    return false
  }
}
