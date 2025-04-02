import { createSupabaseClient } from "@/lib/supabase"

export type UserRole = "admin" | "validator" | "verified" | "registered"

// Check if the current user has a specific role or higher
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase.rpc("has_role", { required_role: requiredRole })

  if (error) {
    console.error("Error checking role:", error)
    return false
  }

  return data || false
}

// Get the current user's role
export async function getUserRole(): Promise<UserRole | null> {
  const supabase = createSupabaseClient()

  const { data, error } = await supabase.rpc("get_user_role")

  if (error) {
    console.error("Error getting user role:", error)
    return null
  }

  return data as UserRole
}

// Vérifier si l'utilisateur est connecté
export async function isAuthenticated(): Promise<boolean> {
  const supabase = createSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return !!session
}

// Vérifier si l'utilisateur est un administrateur
export async function isAdmin(): Promise<boolean> {
  return hasRole("admin")
}

// Vérifier si l'utilisateur est un validateur
export async function isValidator(): Promise<boolean> {
  return hasRole("validator")
}

// Vérifier si l'utilisateur est un administrateur ou un validateur
export async function isAdminOrValidator(): Promise<boolean> {
  const role = await getUserRole()
  return role === "admin" || role === "validator"
}

// Obtenir le niveau de rôle numérique (utile pour les comparaisons)
export function getRoleLevel(role: UserRole | null): number {
  const roleHierarchy: Record<UserRole, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
  }

  return role ? roleHierarchy[role] : 0
}

