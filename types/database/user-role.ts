/**
 * Interface représentant un rôle utilisateur dans la base de données
 */
export interface DbUserRole {
  id: string
  user_id: string
  role: string
  created_at: string | null
  updated_at: string | null
}

/**
 * Types de rôles utilisateur disponibles dans la base de données
 */
export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"
