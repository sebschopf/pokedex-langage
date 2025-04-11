type SecurityEvent = {
    event_type: "unauthorized_access" | "authentication_failure" | "permission_denied" | "suspicious_activity"
    user_id?: string
    ip_address?: string
    user_agent?: string
    path?: string
    details?: string
    severity: "low" | "medium" | "high"
  }
  
  /**
   * Journalise un événement de sécurité dans la console
   * Note: Cette version simplement journalise dans la console, mais vous pourriez
   * l'étendre pour stocker les événements dans une table Supabase
   */
  export async function logSecurityEvent(event: SecurityEvent) {
    try {
      console.log(`[SECURITY EVENT] ${event.severity.toUpperCase()} - ${event.event_type}`, {
        ...event,
        timestamp: new Date().toISOString(),
      })
  
      // Pour une implémentation complète, vous pourriez stocker l'événement dans Supabase
      // const supabase = createServerSupabaseClient()
      // await supabase.from("security_logs").insert({
      //   ...event,
      //   created_at: new Date().toISOString(),
      // })
    } catch (error) {
      // Ne pas faire échouer l'application si la journalisation échoue
      console.error("Erreur lors de la journalisation:", error)
    }
  }
  