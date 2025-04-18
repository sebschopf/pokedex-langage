/**
 * Interface représentant un rôle utilisateur dans la base de données
 * Correspond exactement à la structure de la table user_roles dans Supabase
 */
export interface DbUserRole {
  id: string
  role: string
  created_at: string | null
  updated_at: string | null
}

/**
 * Types de rôles utilisateur disponibles dans la base de données
 */
export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"
