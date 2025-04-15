import { createServerSupabaseClient } from "@/lib/server/supabase/client"
import { dbToCorrection, correctionToDb } from "@/lib/server/mapping"
import type { DbCorrection } from "@/types/database/correction"
import type { Correction } from "@/types/models/correction"

// Options pour la récupération des corrections
export interface GetCorrectionsOptions {
  page?: number
  pageSize?: number
  languageId?: number
  status?: string
  userId?: string
}

/**
 * Récupère la liste des corrections avec pagination et filtres
 */
export async function getCorrections(options: GetCorrectionsOptions = {}) {
  const { page = 1, pageSize = 10, languageId, status, userId } = options

  const supabase = createServerSupabaseClient()

  // Calculer l'offset pour la pagination
  const offset = (page - 1) * pageSize

  // Construire la requête de base
  let query = supabase.from("corrections").select("*", { count: "exact" })

  // Appliquer les filtres si nécessaire
  if (languageId !== undefined) {
    query = query.eq("language_id", languageId)
  }

  if (status) {
    query = query.eq("status", status)
  }

  if (userId) {
    query = query.eq("user_id", userId)
  }

  // Exécuter la requête avec pagination
  const { data, error, count } = await query.range(offset, offset + pageSize - 1)

  if (error) {
    console.error("Erreur lors de la récupération des corrections:", error)
    throw error
  }

  // Convertir les données avec la fonction de mapping
  const mappedData = data ? data.map((item) => dbToCorrection(item as DbCorrection)) : []

  return {
    data: mappedData,
    totalCount: count || 0,
    page,
    pageSize,
  }
}

/**
 * Récupère une correction par son ID
 */
export async function getCorrectionById(id: number) {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("corrections").select("*").eq("id", id).single()

  if (error) {
    console.error(`Erreur lors de la récupération de la correction ${id}:`, error)
    throw error
  }

  return data ? dbToCorrection(data as DbCorrection) : null
}

/**
 * Crée une nouvelle correction
 */
export async function createCorrection(correctionData: Omit<Correction, "id" | "updatedAt">) {
  const supabase = createServerSupabaseClient()

  // Convertir les données pour la base de données
  const dbData = correctionToDb(correctionData)

  // S'assurer que les champs obligatoires sont présents
  if (!dbData.correction_text) {
    throw new Error("Le texte de correction est obligatoire")
  }

  if (!dbData.language_id) {
    throw new Error("L'ID du langage est obligatoire")
  }

  // Définir le statut par défaut si non spécifié
  if (!dbData.status) {
    dbData.status = "pending"
  }

  // Créer un objet qui respecte les contraintes de type de Supabase
  const insertData = {
    correction_text: dbData.correction_text,
    language_id: dbData.language_id,
    status: dbData.status || "pending",
    field: dbData.field,
    framework: dbData.framework,
    suggestion: dbData.suggestion,
    user_id: dbData.user_id,
    created_at: dbData.created_at,
    updated_at: dbData.updated_at,
  }

  const { data, error } = await supabase.from("corrections").insert(insertData).select().single()

  if (error) {
    console.error("Erreur lors de la création de la correction:", error)
    throw error
  }

  return dbToCorrection(data as DbCorrection)
}

/**
 * Met à jour une correction existante
 */
export async function updateCorrection(id: number, correctionData: Partial<Correction>) {
  const supabase = createServerSupabaseClient()

  // Convertir les données pour la base de données
  const dbData = correctionToDb(correctionData)

  // Récupérer d'abord la correction existante
  const { data: existingData, error: fetchError } = await supabase.from("corrections").select("*").eq("id", id).single()

  if (fetchError) {
    console.error(`Erreur lors de la récupération de la correction ${id}:`, fetchError)
    throw fetchError
  }

  if (!existingData) {
    throw new Error(`Correction avec l'ID ${id} non trouvée`)
  }

  // Créer un objet de mise à jour qui ne contient que les champs à modifier
  const updateData: Record<string, any> = {}

  // N'ajouter que les champs qui sont présents dans dbData
  if (dbData.correction_text !== undefined) updateData.correction_text = dbData.correction_text
  if (dbData.language_id !== undefined) updateData.language_id = dbData.language_id
  if (dbData.status !== undefined) updateData.status = dbData.status
  if (dbData.field !== undefined) updateData.field = dbData.field
  if (dbData.framework !== undefined) updateData.framework = dbData.framework
  if (dbData.suggestion !== undefined) updateData.suggestion = dbData.suggestion
  if (dbData.user_id !== undefined) updateData.user_id = dbData.user_id
  if (dbData.created_at !== undefined) updateData.created_at = dbData.created_at
  if (dbData.updated_at !== undefined) updateData.updated_at = dbData.updated_at

  // Mettre à jour la correction avec les champs modifiés
  const { data, error } = await supabase.from("corrections").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error(`Erreur lors de la mise à jour de la correction ${id}:`, error)
    throw error
  }

  return dbToCorrection(data as DbCorrection)
}

/**
 * Supprime une correction
 */
export async function deleteCorrection(id: number) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("corrections").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression de la correction ${id}:`, error)
    throw error
  }

  return true
}

/**
 * Approuve une correction
 */
export async function approveCorrection(id: number) {
  return updateCorrection(id, { status: "approved" })
}

/**
 * Rejette une correction
 */
export async function rejectCorrection(id: number) {
  return updateCorrection(id, { status: "rejected" })
}
