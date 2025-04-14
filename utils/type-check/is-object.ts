/**
 * Utilitaires pour vérifier les types d'objets
 */

/**
 * Vérifie si une valeur est un objet (pas null, pas un tableau, pas une fonction)
 * @param value Valeur à vérifier
 * @returns true si la valeur est un objet
 */
export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
  }
  
  /**
   * Vérifie si une valeur est un objet vide
   * @param value Valeur à vérifier
   * @returns true si la valeur est un objet vide
   */
  export function isEmptyObject(value: unknown): boolean {
    return isObject(value) && Object.keys(value).length === 0
  }
  
  /**
   * Vérifie si une valeur est une instance d'une classe spécifique
   * @param value Valeur à vérifier
   * @param constructor Constructeur de la classe
   * @returns true si la valeur est une instance de la classe
   */
  export function isInstanceOf<T>(value: unknown, constructor: new (...args: any[]) => T): value is T {
    return value instanceof constructor
  }
  
  /**
   * Vérifie si une valeur est une date valide
   * @param value Valeur à vérifier
   * @returns true si la valeur est une date valide
   */
  export function isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime())
  }
  
  /**
   * Vérifie si un objet a une propriété spécifique
   * @param obj Objet à vérifier
   * @param prop Nom de la propriété
   * @returns true si l'objet a la propriété
   */
  export function hasProperty<T extends object, K extends PropertyKey>(obj: T, prop: K): obj is T & Record<K, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }
  