/**
 * Fonctions utilitaires pour la manipulation de chaînes
 */

/**
 * Convertit un nom de langage en nom d'image valide
 * @param name Nom du langage
 * @returns Nom d'image normalisé
 */
export function getImageName(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "")
  }
  
  /**
   * Formate une chaîne pour l'affichage
   * @param value Chaîne à formater
   * @param defaultValue Valeur par défaut si la chaîne est vide
   * @returns Chaîne formatée
   */
  export function formatDisplayString(value: string | null | undefined, defaultValue = "Non défini"): string {
    if (value === null || value === undefined || value.trim() === "") {
      return defaultValue
    }
    return value
  }
  
  /**
   * Tronque une chaîne à une longueur maximale
   * @param text Texte à tronquer
   * @param maxLength Longueur maximale
   * @param suffix Suffixe à ajouter si le texte est tronqué
   * @returns Texte tronqué
   */
  export function truncateText(text: string, maxLength: number, suffix = "..."): string {
    if (!text || text.length <= maxLength) {
      return text
    }
    return text.substring(0, maxLength) + suffix
  }
  