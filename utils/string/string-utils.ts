/**
 * Fonctions utilitaires pour la manipulation de chaînes
 */

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
  
  /**
   * Capitalise la première lettre d'une chaîne
   * @param text Texte à capitaliser
   * @returns Texte avec la première lettre en majuscule
   */
  export function capitalizeFirstLetter(text: string): string {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  
  /**
   * Convertit une chaîne en camelCase
   * @param text Texte à convertir
   * @returns Texte en camelCase
   */
  export function toCamelCase(text: string): string {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, "")
      .replace(/[-_]+/g, "")
  }
  
  /**
   * Convertit une chaîne en kebab-case
   * @param text Texte à convertir
   * @returns Texte en kebab-case
   */
  export function toKebabCase(text: string): string {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase()
  }
  