import { createServerClient } from "@/lib/supabase/"
import { dbToProfile, profileToDb } from "@/lib/server/mapping/profile-mapping"
import { dbToUserRole } from "@/lib/server/mapping/user-role-mapping"
import type { Profile } from "@/types/models/profile"
import type { UserRole, UserRoleType } from "@/types/models/user-role"

/**
 * Récupère tous les profils utilisateurs
 * @returns Liste des profils
 */
export async function getProfiles(): Promise<Profile[]> {
  try {
    const supabase = createServerClient()
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
    const supabase = createServerClient()
    const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

    if (error) {
      console.error(`Erreur lors de la récupération du profil avec l'ID ${id}:`, error)
      return null
    }

    if (!data) return null

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
    const supabase = createServerClient()
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

/**
 * Récupère le rôle d'un utilisateur par son ID
 * @param userId ID de l'utilisateur
 * @returns Le rôle de l'utilisateur ou null si non trouvé
 */
export async function getUserRole(userId: string): Promise<UserRoleType | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Pas de rôle trouvé, attribuer le rôle par défaut "registered"
        return "registered"
      }
      console.error(`Erreur lors de la récupération du rôle pour l'utilisateur ${userId}:`, error)
      return null
    }

    return (data?.role as UserRoleType) || null
  } catch (error) {
    console.error(`Erreur lors de la récupération du rôle pour l'utilisateur ${userId}:`, error)
    return null
  }
}

/**
 * Récupère le rôle complet d'un utilisateur par son ID
 * @param userId ID de l'utilisateur
 * @returns L'objet UserRole ou null si non trouvé
 */
export async function getUserRoleObject(userId: string): Promise<UserRole | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", userId).single()

    if (error) {
      console.error(`Erreur lors de la récupération du rôle pour l'utilisateur ${userId}:`, error)
      return null
    }

    if (!data) return null

    return dbToUserRole({
      id: data.id,
      user_id: userId, // Ajouter cette propriété manquante
      role: data.role,
      created_at: data.created_at,
      updated_at: data.updated_at,
    })
  } catch (error) {
    console.error(`Erreur lors de la récupération du rôle pour l'utilisateur ${userId}:`, error)
    return null
  }
}

/**
 * Met à jour le rôle d'un utilisateur
 * @param userId ID de l'utilisateur
 * @param role Nouveau rôle
 * @returns true si la mise à jour a réussi, false sinon
 */
export async function updateUserRole(userId: string, role: UserRoleType): Promise<boolean> {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur a déjà un rôle
    const { data: existingRole, error: fetchError } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(`Erreur lors de la vérification du rôle existant pour l'utilisateur ${userId}:`, fetchError)
      return false
    }

    if (existingRole) {
      // Filtrer le rôle "anonymous" qui n'est pas stockable en base de données
      const dbRole = role === "anonymous" ? "registered" : role

      // Mettre à jour le rôle existant
      const { error } = await supabase
        .from("user_roles")
        .update({
          role: dbRole,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)

      if (error) {
        console.error(`Erreur lors de la mise à jour du rôle pour l'utilisateur ${userId}:`, error)
        return false
      }
    } else {
      // Filtrer le rôle "anonymous" qui n'est pas stockable en base de données
      const dbRole = role === "anonymous" ? "registered" : role

      // Créer un nouveau rôle
      const { error } = await supabase.from("user_roles").insert({
        id: userId, // Utiliser id au lieu de user_id
        role: dbRole, // Utiliser le rôle filtré
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error(`Erreur lors de la création du rôle pour l'utilisateur ${userId}:`, error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du rôle pour l'utilisateur ${userId}:`, error)
    return false
  }
}

/**
 * Vérifie si un utilisateur a un rôle spécifique ou supérieur
 * @param userId ID de l'utilisateur
 * @param requiredRole Rôle requis
 * @returns true si l'utilisateur a le rôle requis ou supérieur, false sinon
 */
export async function hasRole(userId: string, requiredRole: UserRoleType): Promise<boolean> {
  try {
    const userRole = await getUserRole(userId)

    if (!userRole) return false

    // Définir la hiérarchie des rôles
    const roleHierarchy: Record<UserRoleType, number> = {
      admin: 4,
      validator: 3,
      verified: 2,
      registered: 1,
      anonymous: 0,
    }

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  } catch (error) {
    console.error(`Erreur lors de la vérification du rôle pour l'utilisateur ${userId}:`, error)
    return false
  }
}

/**
 * Récupère un utilisateur avec son profil et son rôle
 * @param userId ID de l'utilisateur
 * @returns Objet contenant le profil et le rôle de l'utilisateur
 */
export async function getUserWithDetails(
  userId: string,
): Promise<{ profile: Profile | null; role: UserRoleType | null }> {
  try {
    const supabase = createServerClient()

    // Récupérer le profil et le rôle en parallèle pour optimiser les performances
    const [profileResult, roleResult] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("user_roles").select("role").eq("user_id", userId).single(),
    ])

    // Gérer les erreurs
    if (profileResult.error && profileResult.error.code !== "PGRST116") {
      console.error(`Erreur lors de la récupération du profil pour l'utilisateur ${userId}:`, profileResult.error)
    }

    if (roleResult.error && roleResult.error.code !== "PGRST116") {
      console.error(`Erreur lors de la récupération du rôle pour l'utilisateur ${userId}:`, roleResult.error)
    }

    // Convertir les données
    const profile = profileResult.data ? dbToProfile(profileResult.data) : null
    const role = (roleResult.data?.role as UserRoleType) || "registered"

    return { profile, role }
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails pour l'utilisateur ${userId}:`, error)
    return { profile: null, role: null }
  }
}
