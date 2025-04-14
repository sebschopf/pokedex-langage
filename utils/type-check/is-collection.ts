/**
 * Utilitaires pour vérifier les types de collections
 */

/**
 * Vérifie si une valeur est un tableau
 * @param value Valeur à vérifier
 * @returns true si la valeur est un tableau
 */
export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
  }
  
  /**
   * Vérifie si une valeur est un tableau vide
   * @param value Valeur à vérifier
   * @returns true si la valeur est un tableau vide
   */
  export function isEmptyArray(value: unknown): boolean {
    return isArray(value) && value.length === 0
  }
  
  /**
   * Vérifie si une valeur est un tableau non vide
   * @param value Valeur à vérifier
   * @returns true si la valeur est un tableau non vide
   */
  export function isNonEmptyArray(value: unknown): value is unknown[] {
    return isArray(value) && value.length > 0
  }
  
  /**
   * Vérifie si une valeur est un tableau d'un type spécifique
   * @param value Valeur à vérifier
   * @param predicate Fonction de prédicat pour vérifier chaque élément
   * @returns true si la valeur est un tableau du type spécifié
   */
  export function isArrayOf<T>(value: unknown, predicate: (item: unknown) => item is T): value is T[] {
    return isArray(value) && value.every(predicate)
  }
  
  /**
   * Vérifie si une valeur est un Map
   * @param value Valeur à vérifier
   * @returns true si la valeur est un Map
   */
  export function isMap(value: unknown): value is Map<unknown, unknown> {
    return value instanceof Map
  }
  
  /**
   * Vérifie si une valeur est un Set
   * @param value Valeur à vérifier
   * @returns true si la valeur est un Set
   */
  export function isSet(value: unknown): value is Set<unknown> {
    return value instanceof Set
  }
  