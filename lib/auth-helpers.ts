import { createSupabaseClient } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

/**
 * Fonction qui gère automatiquement le rafraîchissement des tokens
 * À utiliser dans les composants client qui font des requêtes authentifiées
 */
export async function withTokenRefresh<T>(callback: () => Promise<T>): Promise<T> {
  const supabase = createSupabaseClient()

  try {
    // Tenter d'exécuter la fonction callback
    return await callback()
  } catch (error: any) {
    // Vérifier si l'erreur est due à un token expiré
    if (error.message?.includes("JWT expired") || error.message?.includes("invalid token") || error.status === 401) {
      try {
        // Tenter de rafraîchir la session
        const { data, error: refreshError } = await supabase.auth.refreshSession()

        if (refreshError) throw refreshError

        if (data.session) {
          // Session rafraîchie avec succès, réessayer l'opération
          return await callback()
        } else {
          // Pas de nouvelle session, rediriger vers la connexion
          toast({
            title: "Session expirée",
            description: "Veuillez vous reconnecter pour continuer.",
            variant: "destructive",
          })

          // Rediriger vers la page de connexion
          window.location.href = `/login?redirectedFrom=${encodeURIComponent(window.location.pathname)}`
          throw new Error("Session expirée")
        }
      } catch (refreshError) {
        // Échec du rafraîchissement, rediriger vers la connexion
        toast({
          title: "Session expirée",
          description: "Veuillez vous reconnecter pour continuer.",
          variant: "destructive",
        })

        // Rediriger vers la page de connexion
        window.location.href = `/login?redirectedFrom=${encodeURIComponent(window.location.pathname)}`
        throw error
      }
    }

    // Si ce n'est pas une erreur d'authentification, la propager
    throw error
  }
}
