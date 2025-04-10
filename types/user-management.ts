import type { UserRoleType } from "./user-role"
import type { Profile } from "./profile"

// Type pour les données d'authentification de l'utilisateur
export interface AuthUser {
  email: string // Doit être une chaîne, même vide
  created_at: string // Doit être une chaîne, même vide
  last_sign_in_at?: string | null
}

// Utiliser Profile au lieu de redéfinir UserProfile
export type UserProfile = Profile

// Type pour le rôle utilisateur
export interface UserRoleData {
  id: string
  role: UserRoleType
  created_at: string
  updated_at?: string | null
}

// Type combiné pour l'utilisateur complet
export interface UserWithDetails {
  id: string
  auth: AuthUser
  profile: UserProfile
  role: UserRoleData
}
