import type { UserRoleTypeDB } from "@/lib/client/permissions"

export interface UserRole {
  id: string
  userId: string
  role: UserRoleTypeDB // Utiliser UserRoleTypeDB qui correspond à l'enum PostgreSQL
  createdAt: string
  updatedAt: string | null
}
