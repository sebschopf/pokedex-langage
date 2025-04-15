/**
 * Interface représentant un rôle utilisateur dans l'application
 */
export interface UserRole {
  id: string
  userId: string
  role: string
  createdAt: string | null
  updatedAt: string | null
}

/**
 * Types de rôles utilisateur disponibles
 */
export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"
