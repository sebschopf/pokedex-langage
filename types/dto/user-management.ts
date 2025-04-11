import type { DbUserRole } from "@/types/database/user-role"
import type { Profile } from "@/types/models/profile"

// Type pour les données d'authentification de l'utilisateur
export interface AuthUser {
  email: string // Doit être une chaîne, même vide
  createdAt: string // Doit être une chaîne, même vide
  lastSignInAt?: string | null
}

// Utiliser Profile au lieu de redéfinir UserProfile
export type UserProfile = Profile

// Type pour le rôle utilisateur
export interface UserRoleData {
  id: string
  role: DbUserRole["role"]
  createdAt: string
  updatedAt?: string | null
}

// Type combiné pour l'utilisateur complet
export interface UserWithDetails {
  id: string
  auth: AuthUser
  profile: UserProfile
  role: UserRoleData
  username: null
  fullName: null
  bio: null
  website: null,
  avatarUrl: null
  createdAt: null
  updatedAt: null
}

