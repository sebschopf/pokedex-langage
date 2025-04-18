import { createServerClient } from "@/lib/supabase/server"
import type { UserRoleType } from "@/types/models/user-role"
import type { DbProfile, Profile } from "@/types/models/profile"
import { dbProfileToProfile } from "@/types/models/profile"

// Récupérer le profil d'un utilisateur
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    if (error.code === "PGRST116") {
      // Code d'erreur pour "No rows found"
      return null
    }
    console.error(`Erreur lors de la récupération du profil de l'utilisateur ${userId}:`, error)
    throw error
  }

  // Convertir le profil de la base de données en profil pour l'application
  return dbProfileToProfile(data as DbProfile)
}

// Récupérer le rôle d'un utilisateur
export async function getUserRole(userId: string): Promise<UserRoleType> {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("user_roles").select("role").eq("id", userId).single()

  if (error) {
    if (error.code === "PGRST116") {
      // Aucun rôle trouvé, retourner le rôle par défaut
      return "anonymous"
    }
    console.error(`Erreur lors de la récupération du rôle de l'utilisateur ${userId}:`, error)
    throw error
  }

  // Vérifier que le rôle est bien une valeur valide de UserRoleType
  const role = data.role as string
  const validRoles: UserRoleType[] = ["admin", "validator", "verified", "registered", "anonymous"]

  if (validRoles.includes(role as UserRoleType)) {
    return role as UserRoleType
  }

  return "anonymous"
}

// Mettre à jour le profil d'un utilisateur
export async function updateUserProfile(userId: string, profile: Partial<Profile>): Promise<Profile> {
  const supabase = createServerClient()

  // Convertir le profil partiel de l'application en profil partiel pour la base de données
  const dbProfile: Partial<DbProfile> = {}

  if (profile.username !== undefined) dbProfile.username = profile.username
  if (profile.fullName !== undefined) dbProfile.full_name = profile.fullName
  if (profile.avatarUrl !== undefined) dbProfile.avatar_url = profile.avatarUrl
  if (profile.bio !== undefined) dbProfile.bio = profile.bio
  if (profile.website !== undefined) dbProfile.website = profile.website
  if (profile.email !== undefined) dbProfile.email = profile.email
  if (profile.isVerified !== undefined) dbProfile.is_verified = profile.isVerified

  const { data, error } = await supabase.from("profiles").update(dbProfile).eq("id", userId).select().single()

  if (error) {
    console.error(`Erreur lors de la mise à jour du profil de l'utilisateur ${userId}:`, error)
    throw error
  }

  // Convertir le profil de la base de données en profil pour l'application
  return dbProfileToProfile(data as DbProfile)
}

// Interface pour les détails d'un utilisateur
export interface UserWithDetails {
  id: string
  profile: Profile | null
  role: UserRoleType
  // Ajoutez d'autres propriétés selon vos besoins
}

// Récupérer un utilisateur avec ses détails (profil et rôle)
export async function getUserWithDetails(userId: string): Promise<UserWithDetails> {
  // Récupérer le profil et le rôle en parallèle
  const [profile, role] = await Promise.all([getUserProfile(userId), getUserRole(userId)])

  return {
    id: userId,
    profile,
    role,
  }
}

// Récupérer tous les utilisateurs avec leurs détails
export async function getAllUsersWithDetails(): Promise<UserWithDetails[]> {
  const supabase = createServerClient()

  // Récupérer tous les profils
  const { data: profiles, error } = await supabase.from("profiles").select("*")

  if (error) {
    console.error("Erreur lors de la récupération des profils:", error)
    throw error
  }

  // Récupérer les détails pour chaque utilisateur
  const usersWithDetails = await Promise.all(
    profiles.map(async (profile) => {
      const userId = profile.id
      const role = await getUserRole(userId)

      return {
        id: userId,
        profile: dbProfileToProfile(profile as DbProfile),
        role,
      }
    }),
  )

  return usersWithDetails
}
