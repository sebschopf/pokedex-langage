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
 * Formate une date selon le format spécifié
 * @param date Date à formater
 * @param format Format de date (par défaut: 'DD/MM/YYYY')
 * @returns Date formatée ou texte par défaut si la date est null
 */
export function formatDate(
  date: Date | string | number | null,
  format = "DD/MM/YYYY",
  defaultText = "Non spécifié",
): string {
  if (date === null) {
    return defaultText
  }

  const d = new Date(date)

  // Format simple basé sur des remplacements de chaînes
  const day = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("YY", year.toString().slice(-2))
}
