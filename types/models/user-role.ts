/**
 * Interface représentant un rôle utilisateur dans l'application
 * Version transformée et normalisée de DbUserRole
 */
export interface UserRole {
    createdAt: string | null
    id: string
    role: "admin" | "validator" | "verified" | "registered"
    updatedAt: string | null
  }
  