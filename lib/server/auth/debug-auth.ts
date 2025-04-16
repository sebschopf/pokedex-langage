import { createServerClient } from "../../supabase/"

/**
 * Fonction de débogage pour vérifier le rôle d'un utilisateur
 * @param userId ID de l'utilisateur à vérifier
 * @returns Informations détaillées sur l'utilisateur et son rôle
 */
export async function debugUserRole(userId: string) {
  try {
    const supabase = createServerClient()

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
      // Utiliser une approche sécurisée pour accéder au message d'erreur
      const errorMessage =
        userError && typeof userError === "object" && "message" in userError ? userError.message : String(userError)

      return {
        error: `Erreur lors de la récupération de l'utilisateur: ${errorMessage}`,
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
      roleError: roleError ? getErrorMessage(roleError) : null,
      userError: userError ? getErrorMessage(userError) : null,
      profileError: profileError ? getErrorMessage(profileError) : null,
    }
  } catch (error) {
    return {
      error: `Erreur lors du débogage: ${error instanceof Error ? error.message : String(error)}`,
      roleData: null,
      userExists: false,
    }
  }
}

/**
 * Fonction utilitaire pour extraire le message d'erreur de manière sécurisée
 * @param error Objet d'erreur potentiel
 * @returns Message d'erreur ou représentation en chaîne de l'erreur
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message
  }
  return String(error)
}
