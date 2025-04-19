import type { Profile } from "@/types/models/profile"
import type { UserRoleType } from "@/types/models/user-role"
import { createServerClient } from "@/lib/supabase/server"
import { getUserProfile } from "./profile"
import { getUserRole } from "./roles"
import { dbProfileToProfile } from "@/types/models/profile"
import type { DbProfile } from "@/types/models/profile"

/**
 * Interface représentant un utilisateur avec ses détails (profil et rôle)
 */
export interface UserWithDetails {
  /** Identifiant unique de l'utilisateur */
  id: string
  /** Profil de l'utilisateur, ou null si non trouvé */
  profile: Profile | null
  /** Rôle de l'utilisateur dans l'application */
  role: UserRoleType
}

/**
 * Récupère un utilisateur avec ses détails (profil et rôle)
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @returns Une promesse qui résout vers l'utilisateur avec ses détails
 * @throws {Error} Si une erreur survient lors de la récupération des détails
 */
export async function getUserWithDetails(userId: string): Promise<UserWithDetails> {
  // Récupérer le profil et le rôle en parallèle
  const [profile, role] = await Promise.all([getUserProfile(userId), getUserRole(userId)])

  return {
    id: userId,
    profile,
    role,
  }
}

/**
 * Récupère tous les utilisateurs avec leurs détails
 *
 * @returns Une promesse qui résout vers un tableau d'utilisateurs avec leurs détails
 * @throws {Error} Si une erreur survient lors de la récupération des utilisateurs
 */
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

/**
 * Recherche des utilisateurs selon différents critères
 *
 * @param searchParams - Paramètres de recherche
 * @returns Une promesse qui résout vers un tableau d'utilisateurs correspondant aux critères
 * @throws {Error} Si une erreur survient lors de la recherche
 */
export async function searchUsers(searchParams: {
  username?: string
  role?: UserRoleType
  limit?: number
  offset?: number
}): Promise<UserWithDetails[]> {
  const supabase = createServerClient()
  let query = supabase.from("profiles").select("*")

  // Appliquer les filtres de recherche
  if (searchParams.username) {
    query = query.ilike("username", `%${searchParams.username}%`)
  }

  // Appliquer la pagination
  if (searchParams.limit) {
    query = query.limit(searchParams.limit)
  }

  if (searchParams.offset) {
    query = query.range(searchParams.offset, searchParams.offset + (searchParams.limit || 10) - 1)
  }

  const { data: profiles, error } = await query

  if (error) {
    console.error("Erreur lors de la recherche des utilisateurs:", error)
    throw error
  }

  // Récupérer les détails pour chaque utilisateur
  const usersPromises = profiles.map(async (profile) => {
    const userId = profile.id
    const role = await getUserRole(userId)

    // Filtrer par rôle si spécifié
    if (searchParams.role && role !== searchParams.role) {
      return null
    }

    return {
      id: userId,
      profile: dbProfileToProfile(profile as DbProfile),
      role,
    } as UserWithDetails
  })

  const usersWithNulls = await Promise.all(usersPromises)

  // Filtrer les résultats null (utilisateurs qui ne correspondent pas au filtre de rôle)
  return usersWithNulls.filter((user): user is UserWithDetails => user !== null)
}
