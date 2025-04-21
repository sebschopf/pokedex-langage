import type { UserRoleTypeDB } from "@/lib/client/permissions"

// Type pour la table user_roles dans la base de données
export interface DbUserRole {
  id: string // UUID dans Supabase
  role: UserRoleTypeDB // Utiliser UserRoleTypeDB pour la base de données
  created_at: string | null
  updated_at: string | null
}
