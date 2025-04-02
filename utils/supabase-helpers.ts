import { dbToUserRole } from "../lib/database-mapping"
import type { UserRoleType } from "@/types/user-role" // Changé de UserRole à UserRoleType

export interface UserWithRelations {
  id: string
  role: string
  created_at?: string | null
  updated_at?: string | null
  auth_users:
    | {
        email: string
        created_at: string
        last_sign_in_at?: string | null
      }
    | {
        email: string
        created_at: string
        last_sign_in_at?: string | null
      }[]
  profiles?:
    | {
        username?: string | null
        avatar_url?: string | null
        updated_at?: string | null
      }
    | {
        username?: string | null
        avatar_url?: string | null
        updated_at?: string | null
      }[]
}

export interface NormalizedUser {
  id: string
  role: UserRoleType // Changé de UserRole["role"] à UserRoleType
  created_at?: string | null
  updated_at?: string | null
  auth_user: {
    email: string
    created_at: string
    last_sign_in_at?: string | null
  }
  profile: {
    username?: string | null
    avatar_url?: string | null
    updated_at?: string | null
  }
}

/**
 * Normalise les données d'utilisateur retournées par Supabase
 * pour faciliter l'accès aux relations
 */
export function normalizeUserData(userData: UserWithRelations): NormalizedUser {
  // Convertir le rôle en utilisant la fonction existante
  const userRole = dbToUserRole({
    id: userData.id,
    role: userData.role as UserRoleType, // Ajout d'une assertion de type
    created_at: userData.created_at ?? "",
    updated_at: userData.updated_at ?? "",
  })

  // Normaliser les relations auth_users et profiles
  const authUser = Array.isArray(userData.auth_users) ? userData.auth_users[0] || {} : userData.auth_users || {}

  const profile = userData.profiles
    ? Array.isArray(userData.profiles)
      ? userData.profiles[0] || {}
      : userData.profiles || {}
    : {}

  return {
    id: userRole.id,
    role: userRole.role,
    created_at: userRole.createdAt,
    updated_at: userRole.updatedAt,
    auth_user: authUser,
    profile: profile,
  }
}