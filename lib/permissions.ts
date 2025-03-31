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

