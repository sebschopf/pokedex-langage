import { createServerClient } from "@/lib/supabase/server"
import type { UserRoleType, UserRoleTypeDB } from "@/lib/client/permissions"

/**
 * Vérifie si l'utilisateur actuel a un rôle spécifique ou supérieur
 * @param requiredRole Rôle requis
 * @returns true si l'utilisateur a le rôle requis ou supérieur, false sinon
 */
export async function hasRole(requiredRole: UserRoleType): Promise<boolean> {
  const supabase = createServerClient()

  // Si le rôle requis est "anonymous", tout utilisateur y a accès
  if (requiredRole === "anonymous") {
    return true
  }

  // Récupérer la session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return false
  }

  // Récupérer le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole) {
    return false
  }

  // Définir la hiérarchie des rôles
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
    anonymous: 0,
  }

  // Vérifier si le rôle de l'utilisateur est supérieur ou égal au rôle requis
  return roleHierarchy[userRole.role as UserRoleTypeDB] >= roleHierarchy[requiredRole]
}

export * from "./authorize"
