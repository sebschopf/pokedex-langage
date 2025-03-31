//types/user-role.ts
export type UserRoleType = "admin" | "validator" | "verified" | "registered" | "anonymous"

export interface UserRole {
  // Propriétés principales (camelCase pour l'utilisation dans l'application)
  id: string
  role: UserRoleType
  createdAt?: string | null
  updatedAt?: string | null

  // Propriétés en snake_case pour la compatibilité avec la base de données
  created_at?: string | null
  updated_at?: string | null
}

