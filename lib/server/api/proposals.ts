import { createServerSupabaseClient } from "../supabase/client"
import { dbToLanguageProposal, languageProposalToDb } from "../mapping/language-proposal-mapping"
import type { LanguageProposal } from "@/types/models"

/**
 * Récupère toutes les propositions de langages
 * @returns Liste des propositions triées par date de création (plus récentes d'abord)
 */
export async function getAllProposals(): Promise<LanguageProposal[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("language_proposals")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des propositions:", error)
      return []
    }

    return data.map(dbToLanguageProposal)
  } catch (error) {
    console.error("Erreur lors de la récupération des propositions:", error)
    return []
  }
}

/**
 * Récupère une proposition de langage par son ID
 * @param id ID de la proposition à récupérer
 * @returns La proposition ou null si non trouvée
 */
export async function getProposalById(id: number): Promise<LanguageProposal | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("language_proposals").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération de la proposition avec l'ID ${id}:`, error)
      return null
    }

    return dbToLanguageProposal(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la proposition avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Crée une nouvelle proposition de langage
 * @param proposal Données de la proposition à créer (sans l'ID et les timestamps)
 * @returns La proposition créée ou null en cas d'erreur
 */
export async function createProposal(
  proposal: Omit<LanguageProposal, "id" | "createdAt" | "updatedAt">,
): Promise<LanguageProposal | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = languageProposalToDb({
      ...proposal,
      status: proposal.status || "pending",
    })

    const { data, error } = await supabase.from("language_proposals").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la proposition:", error)
      return null
    }

    return dbToLanguageProposal(data)
  } catch (error) {
    console.error("Erreur lors de la création de la proposition:", error)
    return null
  }
}

/**
 * Met à jour le statut d'une proposition de langage
 * @param id ID de la proposition à mettre à jour
 * @param status Nouveau statut
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateProposalStatus(id: number, status: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("language_proposals")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du statut de la proposition avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut de la proposition avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime une proposition de langage
 * @param id ID de la proposition à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteProposal(id: number): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("language_proposals").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la proposition avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de la proposition avec l'ID ${id}:`, error)
    return false
  }
}
