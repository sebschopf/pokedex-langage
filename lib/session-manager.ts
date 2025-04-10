import { createServerSupabaseClient } from "@/lib/supabase-server"

/**
 * Limite le nombre de sessions actives par utilisateur
 * @param userId ID de l'utilisateur
 * @param maxSessions Nombre maximum de sessions autorisées (par défaut: 5)
 * @returns true si la session est autorisée, false sinon
 */
export async function limitActiveSessions(userId: string, maxSessions = 5): Promise<boolean> {
  try {
    const supabase = createServerSupabaseClient()

    // Récupérer les sessions actives de l'utilisateur
    const { data, error } = await supabase.auth.admin.listUserSessions(userId)

    if (error) {
      console.error("Erreur lors de la récupération des sessions:", error)
      // En cas d'erreur, autoriser la session par défaut
      return true
    }

    // Si le nombre de sessions est inférieur à la limite, autoriser
    if (!data || data.length < maxSessions) {
      return true
    }

    // Si la limite est atteinte, supprimer la session la plus ancienne
    if (data.length >= maxSessions) {
      // Trier les sessions par date de création (la plus ancienne en premier)
      const sortedSessions = [...data].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )

      // Supprimer la session la plus ancienne
      const oldestSession = sortedSessions[0]
      if (oldestSession && oldestSession.id) {
        await supabase.auth.admin.deleteSession(oldestSession.id)
        console.log(`Session la plus ancienne supprimée pour l'utilisateur ${userId}`)
        return true
      }
    }

    return false
  } catch (error) {
    console.error("Erreur lors de la limitation des sessions:", error)
    // En cas d'erreur, autoriser la session par défaut
    return true
  }
}
