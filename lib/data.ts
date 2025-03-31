/**
 * Module utilitaire central pour interagir avec la base de données Supabase
 * Fournit des fonctions CRUD pour les langages, bibliothèques et corrections
 */

import { createServerSupabaseClient } from "./supabase"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"
import type { Correction } from "@/types/correction"
import type { LanguageProposal } from "@/types/language-proposal"
import {
  dbToLanguage,
  languageToDb,
  dbToLibrary,
  libraryToDb,
  dbToCorrection,
  correctionToDb,
  dbToLanguageProposal,
  languageProposalToDb,
} from "../types/database-mapping"

// ===== FONCTIONS DE LECTURE (READ) =====

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
export async function getLanguageById(id: string): Promise<Language | null> {
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
 * Récupère toutes les bibliothèques associées à un langage
 * @param languageId ID du langage parent
 * @returns Liste des bibliothèques triées par nom
 */
export async function getLibrariesByLanguageId(languageId: string): Promise<Library[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("libraries").select("*").eq("language_id", languageId).order("name")

    if (error) {
      console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
      return []
    }

    return data.map(dbToLibrary)
  } catch (error) {
    console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
    return []
  }
}

/**
 * Récupère une bibliothèque par son ID
 * @param id ID de la bibliothèque à récupérer
 * @returns La bibliothèque ou null si non trouvée
 */
export async function getLibraryById(id: string): Promise<Library | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("libraries").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération de la bibliothèque avec l'ID ${id}:`, error)
      return null
    }

    return dbToLibrary(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la bibliothèque avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Récupère toutes les corrections associées à un langage
 * @param languageId ID du langage parent
 * @returns Liste des corrections triées par date de création (plus récentes d'abord)
 */
export async function getCorrectionsByLanguageId(languageId: string): Promise<Correction[]> {
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
export async function getProposalById(id: string): Promise<LanguageProposal | null> {
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

// ===== FONCTIONS DE CRÉATION (CREATE) =====

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
 * Crée une nouvelle bibliothèque associée à un langage
 * @param library Données de la bibliothèque à créer (sans l'ID)
 * @param languageId ID du langage parent
 * @returns La bibliothèque créée ou null en cas d'erreur
 */
export async function createLibrary(library: Omit<Library, "id">, languageId: string): Promise<Library | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = libraryToDb({
      ...library,
      languageId: typeof languageId === "string" ? Number.parseInt(languageId, 10) : languageId,
    })

    const { data, error } = await supabase.from("libraries").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la bibliothèque:", error)
      return null
    }

    return dbToLibrary(data)
  } catch (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    return null
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

// ===== FONCTIONS DE MISE À JOUR (UPDATE) =====

/**
 * Met à jour un langage existant
 * @param id ID du langage à mettre à jour
 * @param language Données partielles du langage à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateLanguage(id: string, language: Partial<Language>): Promise<boolean> {
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
 * Met à jour une bibliothèque existante
 * @param id ID de la bibliothèque à mettre à jour
 * @param library Données partielles de la bibliothèque à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateLibrary(id: string, library: Partial<Library>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = libraryToDb(library)

    const { error } = await supabase
      .from("libraries")
      .update({
        ...dbData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Met à jour le statut d'une correction
 * @param id ID de la correction à mettre à jour
 * @param status Nouveau statut
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateCorrectionStatus(id: string, status: string): Promise<boolean> {
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
 * Met à jour le statut d'une proposition de langage
 * @param id ID de la proposition à mettre à jour
 * @param status Nouveau statut
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateProposalStatus(id: string, status: string): Promise<boolean> {
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

// ===== FONCTIONS DE SUPPRESSION (DELETE) =====

/**
 * Supprime un langage
 * @param id ID du langage à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteLanguage(id: string): Promise<boolean> {
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

/**
 * Supprime une bibliothèque
 * @param id ID de la bibliothèque à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteLibrary(id: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("libraries").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime une correction
 * @param id ID de la correction à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteCorrection(id: string): Promise<boolean> {
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

/**
 * Supprime une proposition de langage
 * @param id ID de la proposition à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteProposal(id: string): Promise<boolean> {
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

