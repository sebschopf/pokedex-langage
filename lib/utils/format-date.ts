/**
 * Formate une date en format lisible
 * @param dateString - La date à formater (ISO string)
 * @returns La date formatée en français
 */
export function formatDate(dateString: string): string {
    if (!dateString) return ""
  
    const date = new Date(dateString)
  
    // Options pour le format de date français
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  
    return new Intl.DateTimeFormat("fr-FR", options).format(date)
  }
  