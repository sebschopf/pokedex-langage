/**
 * Utilitaire pour journaliser les événements de sécurité
 */

/**
 * Types d'événements de sécurité
 */
export enum SecurityEventType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
  PASSWORD_CHANGE = "PASSWORD_CHANGE",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY",
}

/**
 * Interface pour un événement de sécurité
 */
export interface SecurityEvent {
  type: SecurityEventType
  userId?: string
  message: string
  metadata?: Record<string, any>
  timestamp: Date
}

/**
 * Journalise un événement de sécurité
 * @param event Événement de sécurité à journaliser
 */
export function logSecurityEvent(event: Omit<SecurityEvent, "timestamp">): void {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: new Date(),
  }

  // En développement, afficher dans la console
  if (process.env.NODE_ENV === "development") {
    console.log(`[SECURITY] ${fullEvent.type}: ${fullEvent.message}`, fullEvent)
  }

  // En production, vous pourriez envoyer à un service de journalisation
  // ou stocker dans la base de données
  // TODO: Implémenter la journalisation en production
}
