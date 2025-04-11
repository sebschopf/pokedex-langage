import { createServerSupabaseClient } from "../supabase/client"
import { dbToProfile } from "../mapping/profile-mapping"
import type { Profile } from "@/types/models"
import { profileToDb } from "../mapping/profile-mapping"

/**
 * Récupère tous les profils utilisateurs
 * @returns Liste des profils
 */
export async function getProfiles(): Promise<Profile[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("profiles").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des profils:", error)
      return []
    }

    return data.map(dbToProfile)
  } catch (error) {
    console.error("Erreur lors de la récupération des profils:", error)
    return []
  }
}

/**
 * Récupère un profil utilisateur par son ID
 * @param id ID de l'utilisateur
 * @returns Le profil ou null si non trouvé
 */
export async function getProfileById(id: string): Promise<Profile | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération du profil avec l'ID ${id}:`, error)
      return null
    }

    return dbToProfile(data)
  } catch (error) {
    console.error(`Erreur lors de la récupération du profil avec l'ID ${id}:`, error)
    return null
  }
}

/**
 * Met à jour un profil utilisateur
 * @param id ID de l'utilisateur
 * @param profile Données partielles du profil à mettre à jour
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateProfile(id: string, profile: Partial<Profile>): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()
    const dbData = profileToDb(profile)

    const { error } = await supabase
      .from("profiles")
      .update({
        ...dbData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error(`Erreur lors de la mise à jour du profil avec l'ID ${id}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du profil avec l'ID ${id}:`, error)
    return false
  }
}
