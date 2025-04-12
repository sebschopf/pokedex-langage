import type { UserRoleTypeDB } from "@/lib/client/permissions"

export interface DbUserRole {
  id: string
  user_id: string
  role: UserRoleTypeDB // Utiliser UserRoleTypeDB qui correspond à l'enum PostgreSQL
  created_at: string
  updated_at: string | null
}
