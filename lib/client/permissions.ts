import { createClientSupabaseClient } from "./supabase"

// Type pour les rôles stockés en base de données (correspond exactement à l'enum PostgreSQL)
export type UserRoleTypeDB = "admin" | "validator" | "verified" | "registered"

// Type étendu pour l'application qui inclut "anonymous" pour les utilisateurs non connectés
export type UserRoleType = UserRoleTypeDB | "anonymous"

// Get the current user's role
export async function getUserRole(): Promise<UserRoleType> {
  const supabase = createClientSupabaseClient()

  // Vérifier d'abord si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si pas de session, l'utilisateur est anonyme
  if (!session) {
    return "anonymous"
  }

  // Sinon, récupérer le rôle depuis la base de données
  const { data, error } = await supabase.rpc("get_user_role")

  if (error) {
    console.error("Error getting user role:", error)
    // En cas d'erreur, considérer l'utilisateur comme anonyme
    return "anonymous"
  }

  return data as UserRoleTypeDB
}

// Check if the current user has a specific role or higher
export async function hasRole(requiredRole: UserRoleType): Promise<boolean> {
  // Si le rôle requis est "anonymous", tout utilisateur (même non connecté) y a accès
  if (requiredRole === "anonymous") {
    return true
  }

  const userRole = await getUserRole()

  // Si l'utilisateur est anonyme, il n'a accès à aucun rôle autre que "anonymous"
  if (userRole === "anonymous") {
    return false
  }

  // Sinon, vérifier le niveau de rôle
  const roleHierarchy: Record<UserRoleTypeDB, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole as UserRoleTypeDB]
}

// Autres fonctions...
