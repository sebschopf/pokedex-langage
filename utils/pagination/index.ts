/**
 * Utilitaires pour la pagination
 */

/**
 * Calcule le nombre total de pages
 * @param totalItems Nombre total d'éléments
 * @param pageSize Taille de la page
 * @returns Nombre total de pages
 */
export function calculateTotalPages(totalItems: number, pageSize: number): number {
    return Math.ceil(totalItems / pageSize)
  }
  
  /**
   * Calcule l'offset pour une requête SQL
   * @param page Numéro de page (commence à 1)
   * @param pageSize Taille de la page
   * @returns Offset pour la requête SQL
   */
  export function calculateOffset(page: number, pageSize: number): number {
    return (Math.max(1, page) - 1) * pageSize
  }
  
  /**
   * Génère un tableau de numéros de page pour l'affichage de la pagination
   * @param currentPage Page actuelle
   * @param totalPages Nombre total de pages
   * @param maxVisiblePages Nombre maximum de pages visibles
   * @returns Tableau de numéros de page
   */
  export function generatePageNumbers(currentPage: number, totalPages: number, maxVisiblePages = 5): number[] {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
  
    const halfVisible = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(currentPage - halfVisible, 1)
    let endPage = startPage + maxVisiblePages - 1
  
    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }
  