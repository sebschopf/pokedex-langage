import { createServerSupabaseClient } from "./supabase-server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { UserRoleType } from "@/types/database/user-role"

/**
 * Vérifie si l'utilisateur est authentifié côté serveur
 * @param redirectTo URL vers laquelle rediriger si l'utilisateur n'est pas connecté
 * @returns Les données de session si l'utilisateur est connecté
 */
export async function requireAuth(redirectTo = "/login") {
  const supabase = createServerSupabaseClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    // Construire l'URL de redirection avec le paramètre redirectedFrom
    const currentPath = (await cookies()).get("currentPath")?.value || "/"
    const redirectUrl = `${redirectTo}?redirectedFrom=${encodeURIComponent(currentPath)}`
    redirect(redirectUrl)
  }

  return session
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 * @param requiredRole Rôle requis pour accéder à la ressource
 * @param redirectTo URL vers laquelle rediriger si l'utilisateur n'a pas le rôle requis
 * @returns Les données de session et le rôle si l'utilisateur a le rôle requis
 */
export async function requireRole(requiredRole: UserRoleType | UserRoleType[], redirectTo = "/") {
  const session = await requireAuth()
  const supabase = createServerSupabaseClient({ cookies })

  const { data: userRole, error } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (error || !userRole) {
    redirect(redirectTo)
  }

  // Vérifier si l'utilisateur a l'un des rôles requis
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  if (!requiredRoles.includes(userRole.role as UserRoleType)) {
    redirect(redirectTo)
  }

  return { session, role: userRole.role as UserRoleType }
}
