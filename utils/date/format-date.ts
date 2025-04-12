/**
 * Utilitaires pour le formatage des dates
 */

/**
 * Formate une date en format français (DD/MM/YYYY)
 * @param date Date à formater
 * @returns Date formatée
 */
export function formatDateFr(date: Date | string | number): string {
    const d = new Date(date)
    return d.toLocaleDateString("fr-FR")
  }
  
  /**
   * Formate une date en format ISO (YYYY-MM-DD)
   * @param date Date à formater
   * @returns Date formatée
   */
  export function formatDateIso(date: Date | string | number): string {
    const d = new Date(date)
    return d.toISOString().split("T")[0]
  }
  
  /**
   * Formate une date avec l'heure en format français
   * @param date Date à formater
   * @returns Date et heure formatées
   */
  export function formatDateTimeFr(date: Date | string | number): string {
    const d = new Date(date)
    return d.toLocaleString("fr-FR")
  }
  
  /**
   * Calcule la différence en jours entre deux dates
   * @param date1 Première date
   * @param date2 Deuxième date (par défaut: date actuelle)
   * @returns Nombre de jours de différence
   */
  export function daysBetween(date1: Date | string | number, date2: Date | string | number = new Date()): number {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  