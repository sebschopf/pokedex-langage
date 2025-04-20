/**
 * Utilitaires pour la validation des slugs
 */

/**
 * Vérifie si un slug est valide
 * @param slug Slug à vérifier
 * @returns true si le slug est valide, false sinon
 */
export function isValidSlug(slug: string): boolean {
    // Un slug valide ne contient que des lettres minuscules, des chiffres et des tirets
    // et ne commence ni ne finit par un tiret
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
  }
  
  /**
   * Vérifie si un slug est disponible (non utilisé)
   * @param slug Slug à vérifier
   * @param existingSlugs Liste des slugs existants
   * @returns true si le slug est disponible, false sinon
   */
  export function isSlugAvailable(slug: string, existingSlugs: string[]): boolean {
    return !existingSlugs.includes(slug)
  }
  