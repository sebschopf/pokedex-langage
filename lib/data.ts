import { createServerSupabaseClient } from "@/lib/supabase-server"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"
import type { Correction } from "@/types/correction"
import type { LanguageProposal } from "@/types/database/language-proposal"
import type { LibraryLanguage } from "@/types/database/library-language"
import type { TechnologyCategory } from "@/types/database/technology-category"
import type { TechnologySubtype } from "@/types/database/technology-subtype"
import {
  dbToLanguage,
  languageToDb,
  dbToLibrary,
  libraryToDb,
  dbToCorrection,
  correctionToDb,
  dbToLanguageProposal,
  languageProposalToDb,
  dbToLibraryLanguage,
  libraryLanguageToDb,
  dbToTechnologyCategory,
  technologyCategoryToDb,
  dbToTechnologySubtype,
  technologySubtypeToDb,
} from "./database-mapping"

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
      languageId: languageId, // Simplement utiliser languageId tel quel, car il est déjà une chaîne
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

// ===== FONCTIONS POUR LIBRARY_LANGUAGES =====

/**
 * Récupère toutes les associations entre bibliothèques et langages
 * @returns Liste des associations
 */
export async function getAllLibraryLanguages(): Promise<LibraryLanguage[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("library_languages").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des associations bibliothèque-langage:", error)
      return []
    }

    return data.map(dbToLibraryLanguage)
  } catch (error) {
    console.error("Erreur lors de la récupération des associations bibliothèque-langage:", error)
    return []
  }
}

/**
 * Récupère toutes les associations pour une bibliothèque donnée
 * @param libraryId ID de la bibliothèque
 * @returns Liste des associations pour cette bibliothèque
 */
export async function getLanguagesForLibrary(libraryId: string): Promise<LibraryLanguage[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("library_languages").select("*").eq("library_id", libraryId)

    if (error) {
      console.error(`Erreur lors de la récupération des langages pour la bibliothèque ${libraryId}:`, error)
      return []
    }

    return data.map(dbToLibraryLanguage)
  } catch (error) {
    console.error(`Erreur lors de la récupération des langages pour la bibliothèque ${libraryId}:`, error)
    return []
  }
}

/**
 * Récupère toutes les associations pour un langage donné
 * @param languageId ID du langage
 * @returns Liste des associations pour ce langage
 */
export async function getLibrariesForLanguage(languageId: string): Promise<LibraryLanguage[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("library_languages").select("*").eq("language_id", languageId)

    if (error) {
      console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
      return []
    }

    return data.map(dbToLibraryLanguage)
  } catch (error) {
    console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
    return []
  }
}

/**
 * Crée une nouvelle association entre une bibliothèque et un langage
 * @param libraryLanguage Données de l'association à créer
 * @returns L'association créée ou null en cas d'erreur
 */
export async function createLibraryLanguage(
  libraryLanguage: Omit<LibraryLanguage, "id" | "createdAt">,
): Promise<LibraryLanguage | null> {
  try {
    const supabase = createServerSupabaseClient()

    // Générer un ID unique si non fourni
    const newLibraryLanguage = {
      ...libraryLanguage,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    const dbData = libraryLanguageToDb(newLibraryLanguage)

    const { data, error } = await supabase.from("library_languages").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création de l'association bibliothèque-langage:", error)
      return null
    }

    return dbToLibraryLanguage(data)
  } catch (error) {
    console.error("Erreur lors de la création de l'association bibliothèque-langage:", error)
    return null
  }
}

/**
 * Met à jour une association existante
 * @param id ID de l'association à mettre à jour
 * @param libraryLanguage Données partielles de l'association à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateLibraryLanguage(id: string, libraryLanguage: Partial<LibraryLanguage>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = libraryLanguageToDb(libraryLanguage)

    const { error } = await supabase.from("library_languages").update(dbData).eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour de l'association avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'association avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Met à jour le statut "langage principal" d'une association
 * @param libraryId ID de la bibliothèque
 * @param languageId ID du langage
 * @param isPrimary Nouveau statut "langage principal"
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updatePrimaryLanguageStatus(
  libraryId: string,
  languageId: string,
  isPrimary: boolean,
): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("library_languages")
      .update({ primary_language: isPrimary })
      .match({ library_id: libraryId, language_id: languageId })

    if (error) {
      console.error(`Erreur lors de la mise à jour du statut de langage principal:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut de langage principal:`, error)
    return false
  }
}

/**
 * Supprime une association entre une bibliothèque et un langage
 * @param id ID de l'association à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteLibraryLanguage(id: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("library_languages").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de l'association avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'association avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime toutes les associations pour une bibliothèque donnée
 * @param libraryId ID de la bibliothèque
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteLibraryLanguagesByLibraryId(libraryId: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("library_languages").delete().eq("library_id", libraryId)

    if (error) {
      console.error(`Erreur lors de la suppression des associations pour la bibliothèque ${libraryId}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression des associations pour la bibliothèque ${libraryId}:`, error)
    return false
  }
}

//===== FONCTIONS POUR TECHNOLOGY_CATEGORY =====
/**
 * Récupère toutes les catégories de technologie
 * @returns Liste des catégories triées par nom
 */
export async function getTechnologyCategories(): Promise<TechnologyCategory[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("technology_categories").select("*").order("type")

    if (error) {
      console.error("Erreur lors de la récupération des catégories de technologie:", error)
      return []
    }

    // Utiliser la fonction de conversion pour normaliser les données
    return data.map(dbToTechnologyCategory)
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories de technologie:", error)
    return []
  }
}

/**
 * Récupère une catégorie de technologie par son ID
 * @param id ID de la catégorie à récupérer
 * @returns La catégorie ou null si non trouvée
 */
export async function getTechnologyCategoryById(id: string): Promise<TechnologyCategory | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("technology_categories").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération de la catégorie avec l'ID ${id}:`, error)
      return null
    }

    return dbToTechnologyCategory(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération de la catégorie avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Crée une nouvelle catégorie de technologie
 * @param category Données de la catégorie à créer (sans l'ID)
 * @returns La catégorie créée ou null en cas d'erreur
 */
export async function createTechnologyCategory(
  category: Omit<TechnologyCategory, "id" | "createdAt">,
): Promise<TechnologyCategory | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = technologyCategoryToDb(category as TechnologyCategory)

    const { data, error } = await supabase.from("technology_categories").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création de la catégorie de technologie:", error)
      return null
    }

    return dbToTechnologyCategory(data)
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie de technologie:", error)
    return null
  }
}

/**
 * Met à jour une catégorie de technologie existante
 * @param id ID de la catégorie à mettre à jour
 * @param category Données partielles de la catégorie à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateTechnologyCategory(id: string, category: Partial<TechnologyCategory>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = technologyCategoryToDb(category as TechnologyCategory)

    const { error } = await supabase
      .from("technology_categories")
      .update({
        ...dbData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la catégorie avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime une catégorie de technologie
 * @param id ID de la catégorie à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteTechnologyCategory(id: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("technology_categories").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression de la catégorie avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression de la catégorie avec l'ID ${id}:`, error)
    return false
  }
}

// ===== FONCTIONS POUR TECHNOLOGY_SUBTYPE =====

/**
 * Récupère tous les sous-types de technologie
 * @returns Liste des sous-types triés par nom
 */
export async function getTechnologySubtypes(): Promise<TechnologySubtype[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("technology_subtypes").select("*").order("name")

    if (error) {
      console.error("Erreur lors de la récupération des sous-types de technologie:", error)
      return []
    }

    // Utiliser la fonction de conversion pour normaliser les données
    return data.map(dbToTechnologySubtype)
  } catch (error) {
    console.error("Erreur lors de la récupération des sous-types de technologie:", error)
    return []
  }
}

/**
 * Récupère tous les sous-types pour une catégorie donnée
 * @param categoryId ID de la catégorie
 * @returns Liste des sous-types triés par nom
 */
export async function getSubtypesByCategoryId(categoryId: string): Promise<TechnologySubtype[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("technology_subtypes")
      .select("*")
      .eq("category_id", categoryId)
      .order("name")

    if (error) {
      console.error(`Erreur lors de la récupération des sous-types pour la catégorie ${categoryId}:`, error)
      return []
    }

    return data.map(dbToTechnologySubtype)
  } catch (error) {
    console.error(`Erreur lors de la récupération des sous-types pour la catégorie ${categoryId}:`, error)
    return []
  }
}

/**
 * Récupère un sous-type de technologie par son ID
 * @param id ID du sous-type à récupérer
 * @returns Le sous-type ou null si non trouvé
 */
export async function getTechnologySubtypeById(id: string): Promise<TechnologySubtype | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("technology_subtypes").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération du sous-type avec l'ID ${id}:`, error)
      return null
    }

    return dbToTechnologySubtype(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération du sous-type avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Crée un nouveau sous-type de technologie
 * @param subtype Données du sous-type à créer (sans l'ID)
 * @returns Le sous-type créé ou null en cas d'erreur
 */
export async function createTechnologySubtype(
  subtype: Omit<TechnologySubtype, "id" | "createdAt">,
): Promise<TechnologySubtype | null> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = technologySubtypeToDb(subtype as TechnologySubtype)

    const { data, error } = await supabase.from("technology_subtypes").insert(dbData).select().single()

    if (error) {
      console.error("Erreur lors de la création du sous-type de technologie:", error)
      return null
    }

    return dbToTechnologySubtype(data)
  } catch (error) {
    console.error("Erreur lors de la création du sous-type de technologie:", error)
    return null
  }
}

/**
 * Met à jour un sous-type de technologie existant
 * @param id ID du sous-type à mettre à jour
 * @param subtype Données partielles du sous-type à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateTechnologySubtype(id: string, subtype: Partial<TechnologySubtype>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = technologySubtypeToDb(subtype as TechnologySubtype)

    const { error } = await supabase
      .from("technology_subtypes")
      .update({
        ...dbData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du sous-type avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du sous-type avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Supprime un sous-type de technologie
 * @param id ID du sous-type à supprimer
 * @returns true si la suppression a réussi, false sinon
 */
export async function deleteTechnologySubtype(id: string): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("technology_subtypes").delete().eq("id", id)

    if (error) {
      console.error(`Erreur lors de la suppression du sous-type avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la suppression du sous-type avec l'ID ${id}:`, error)
    return false
  }
}

/**
 * Récupère les statistiques des types de technologies
 * @returns Liste des types avec leur nombre d'occurrences
 */
export async function getTechnologyTypeStats(): Promise<{ type: string; count: number }[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("libraries")
      .select("technology_type")
      .not("technology_type", "is", null)

    if (error) {
      console.error("Erreur lors de la récupération des statistiques des types de technologies:", error)
      return []
    }

    const counts: { [key: string]: number } = {}
    data.forEach((item) => {
      const type = item.technology_type
      if (type) {
        counts[type] = (counts[type] || 0) + 1
      }
    })

    const stats = Object.entries(counts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)

    return stats
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des types de technologies:", error)
    return []
  }
}

/**
 * Récupère les statistiques des sous-types
 * @returns Liste des sous-types avec leur nombre d'occurrences
 */
export async function getSubtypeStats(): Promise<{ subtype: string; count: number }[]> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("libraries").select("subtype").not("subtype", "is", null)

    if (error) {
      console.error("Erreur lors de la récupération des statistiques des sous-types:", error)
      return []
    }

    const counts: { [key: string]: number } = {}
    data.forEach((item) => {
      const subtype = item.subtype
      if (subtype) {
        counts[subtype] = (counts[subtype] || 0) + 1
      }
    })

    const stats = Object.entries(counts)
      .map(([subtype, count]) => ({ subtype, count }))
      .sort((a, b) => b.count - a.count)

    return stats
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des sous-types:", error)
    return []
  }
}
