import { cache } from "react"
import { createServerSupabaseClient } from "../supabase/client"
import type { Language } from "@/types/models"
import { dbToLanguage, languageToDb } from "../mapping/language-mapping"
import { generateLanguageSlug } from "@/utils/slug"

const LANGUAGE_COLUMNS =
  "id, created_at, creator, description, is_open_source, logo_path, name, popular_frameworks, short_description, slug, strengths, tools, type, updated_at, usage_rate, used_for, year_created"

/**
 * Récupère tous les langages
 * @returns Liste des langages
 */
export const getLanguages = cache(async (): Promise<Language[]> => {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("languages").select(LANGUAGE_COLUMNS).order("name")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return []
  }

  return data.map(dbToLanguage)
})

/**
 * Récupère un langage par son slug
 * @param slug Slug du langage
 * @returns Le langage ou null si non trouvé
 */
export const getLanguageBySlug = cache(async (slug: string): Promise<Language | null> => {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("languages").select(LANGUAGE_COLUMNS).eq("slug", slug).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage avec le slug ${slug}:`, error)
    return null
  }

  if (!data) {
    return null
  }

  return dbToLanguage(data)
})

/**
 * Récupère un langage par son ID
 * @param id ID du langage
 * @returns Le langage ou null si non trouvé
 */
export const getLanguageById = cache(async (id: number): Promise<Language | null> => {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("languages").select(LANGUAGE_COLUMNS).eq("id", id).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage avec l'ID ${id}:`, error)
    return null
  }

  if (!data) {
    return null
  }

  return dbToLanguage(data)
})

/**
 * Crée un nouveau langage
 * @param language Données du langage à créer
 * @returns Le langage créé ou null en cas d'erreur
 */
export async function createLanguage(
  language: Omit<Language, "id" | "createdAt" | "updatedAt">,
): Promise<Language | null> {
  try {
    const supabase = createServerSupabaseClient()

    // Générer le slug à partir du nom
    const slug = generateLanguageSlug(language.name)

    const dbLanguage = languageToDb({
      ...language,
      slug: slug,
    })

    const { data, error } = await supabase.from("languages").insert(dbLanguage).select().single()

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

    const dbLanguage = languageToDb(language)

    const { error } = await supabase.from("languages").update(dbLanguage).eq("id", id)

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
