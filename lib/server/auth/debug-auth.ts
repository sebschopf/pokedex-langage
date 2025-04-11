import { createServerSupabaseClient } from "../supabase/client"

/**
 * Fonction de débogage pour vérifier le rôle d'un utilisateur
 * @param userId ID de l'utilisateur à vérifier
 * @returns Informations détaillées sur l'utilisateur et son rôle
 */
export async function debugUserRole(userId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Récupérer le rôle de l'utilisateur
    const { data: roleData, error: roleError } = await supabase.from("user_roles").select("*").eq("id", userId).single()

    if (roleError) {
      return {
        error: `Erreur lors de la récupération du rôle: ${roleError.message}`,
        roleData: null,
        userExists: false,
      }
    }

    // Vérifier si l'utilisateur existe dans la table auth.users
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId)

    if (userError) {
      return {
        error: `Erreur lors de la récupération de l'utilisateur: ${userError.message}`,
        roleData,
        userExists: false,
      }
    }

    // Récupérer le profil de l'utilisateur
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    return {
      roleData,
      userData,
      profileData,
      userExists: !!userData,
      hasRole: !!roleData,
      roleError: roleError ? roleError.message : null,
      userError: userError ? userError.message : null,
      profileError: profileError ? profileError.message : null,
    }
  } catch (error) {
    return {
      error: `Erreur lors du débogage: ${error instanceof Error ? error.message : String(error)}`,
      roleData: null,
      userExists: false,
    }
  }
}
