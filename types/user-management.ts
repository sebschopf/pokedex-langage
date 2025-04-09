import type { UserRoleType } from "./user-role"

// Type pour les données d'authentification de l'utilisateur
export interface AuthUser {
  email: string // Doit être une chaîne, même vide
  created_at: string // Doit être une chaîne, même vide
  last_sign_in_at?: string | null
}

// Type pour le profil utilisateur
export interface UserProfile {
  id: string
  username?: string | null
  full_name?: string | null
  bio?: string | null
  website?: string | null
  avatar_url?: string | null
  updated_at?: string | null
  created_at?: string | null
}

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
