/**
 * Utilitaires pour le formatage de données
 */

/**
 * Formate une date en format lisible
 * @param date Date à formater
 * @returns Date formatée
 */
export function formatDate(date: string | Date | null): string {
  if (!date) return 'Non spécifié';

  const d = new Date(date);
  return d.toLocaleDateString('fr-FR');
}

/**
 * Tronque un texte à une longueur maximale
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale
 * @returns Texte tronqué
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Formate un nombre avec séparateur de milliers
 * @param num Nombre à formater
 * @returns Nombre formaté
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('fr-FR');
}
