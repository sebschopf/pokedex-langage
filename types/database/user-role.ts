/**
 * Type représentant un rôle utilisateur tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'user_roles' dans Supabase
 */
export type DbUserRole = {
  created_at: string | null
  id: string
  role: UserRoleType
  updated_at: string | null
}

export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"