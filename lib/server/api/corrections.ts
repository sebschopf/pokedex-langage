import { createServerSupabaseClient } from "../supabase/client"
import { dbToCorrection, correctionToDb} from "../mapping/correction-mapping"
import type { Correction } from "@/types/models"

/**
 * Récupère toutes les corrections
 * @returns Liste des corrections
 */
export async function getCorrections(): Promise<Correction[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("corrections").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des corrections:", error)
      return []
    }

    return data.map(dbToCorrection)
  } catch (error) {
    console.error("Erreur lors de la récupération des corrections:", error)
    return []
  }
}

/**
 * Récupère toutes les corrections associées à un langage
 * @param languageId ID du langage parent
 * @returns Liste des corrections triées par date de création (plus récentes d'abord)
 */
export async function getCorrectionsByLanguageId(languageId: number): Promise<Correction[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("corrections")
      .select("*")
      .eq("language_id", languageId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(`Erreur lors de la récupération des corrections pour le langage ${languageId}:`, error)
      return []
    }

    return data.map(dbToCorrection)
  } catch (error) {
    console.error(`Erreur lors de la récupération des corrections pour le langage ${languageId}:`, error)
    return []
  }
}

/**
 * Récupère toutes les corrections avec le nom du langage associé
 * @returns Liste des corrections triées par date de création (plus récentes d'abord)
 */
export async function getAllCorrections(): Promise<Correction[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("corrections")
      .select("*, languages(name)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des corrections:", error)
      return []
    }

    return data.map((correction) => {
      const correctionObj = dbToCorrection(correction)
      // Ajouter le nom du langage qui vient de la jointure
      return {
        ...correctionObj,
        languageName: correction.languages?.name,
      }
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des corrections:", error)
    return []
  }
}

/**
 * Crée une nouvelle correction/suggestion
 * @param correction Données de la correction à créer (sans l'ID et les timestamps)
 * @returns La correction créée ou null en cas d'erreur
 */
export async function createCorrection(
  correction: Omit<Correction, "id" | "createdAt" | "updatedAt">,
): Promise<Correction | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = correctionToDb({
      ...correction,
      status: correction.status || "pending",
    })

    const { data, error } = await supabase.from("corrections").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la correction:", error)
      return null
    }

    return dbToCorrection(data)
  } catch (error) {
    console.error("Erreur lors de la création de la correction:", error)
    return null
  }
}

/**
 * Met à jour le statut d'une correction
 * @param id ID de la correction à mettre à jour
 * @param status Nouveau statut
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateCorrectionStatus(id: number, status: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("corrections")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du statut de la correction avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut de la correction avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime une correction
 * @param id ID de la correction à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteCorrection(id: number): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("corrections").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la correction avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de la correction avec l'ID ${id}:`, error)
    return false
  }
}
