import { createServerSupabaseClient } from "../supabase/client"

/**
 * Gestionnaire de sessions utilisateur
 */
export class SessionManager {
  /**
   * Récupère la session active de l'utilisateur courant
   */
  static async getCurrentSession() {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error("Erreur lors de la récupération de la session:", error)
        return null
      }

      return data.session
    } catch (error) {
      console.error("Erreur lors de la récupération de la session:", error)
      return null
    }
  }

  /**
   * Vérifie si un utilisateur est actuellement connecté
   */
  static async isUserLoggedIn() {
    const session = await this.getCurrentSession()
    return !!session
  }

  /**
   * Termine toutes les sessions d'un utilisateur sauf la session courante
   */
  static async terminateOtherSessions() {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.auth.signOut({ scope: "others" })

      if (error) {
        console.error("Erreur lors de la terminaison des autres sessions:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Erreur lors de la terminaison des autres sessions:", error)
      return false
    }
  }

  /**
   * Termine toutes les sessions d'un utilisateur (déconnexion complète)
   */
  static async terminateAllSessions(userId?: string) {
    try {
      const supabase = createServerSupabaseClient()
      
      let error;
      if (userId) {
        // Pour l'administrateur
        const result = await supabase.auth.admin.signOut(userId)
        error = result.error
      } else {
        // Pour l'utilisateur courant
        const result = await supabase.auth.signOut({ scope: "global" })
        error = result.error
      }

      if (error) {
        console.error("Erreur lors de la terminaison de toutes les sessions:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Erreur lors de la terminaison de toutes les sessions:", error)
      return false
    }
  }

  /**
   * Récupère les informations de l'utilisateur actuel
   */
  static async getCurrentUser() {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error)
        return null
      }

      return data.user
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error)
      return null
    }
  }
}