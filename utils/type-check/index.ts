/**
 * Utilitaires pour la vérification de types
 */

/**
 * Vérifie si une valeur est un nombre
 * @param value Valeur à vérifier
 * @returns true si la valeur est un nombre, false sinon
 */
export function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value)
  }
  
  /**
   * Vérifie si une valeur est une chaîne de caractères
   * @param value Valeur à vérifier
   * @returns true si la valeur est une chaîne, false sinon
   */
  export function isString(value: unknown): value is string {
    return typeof value === "string"
  }
  
  /**
   * Vérifie si une valeur est un booléen
   * @param value Valeur à vérifier
   * @returns true si la valeur est un booléen, false sinon
   */
  export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean"
  }
  
  /**
   * Vérifie si une valeur est un objet (et pas null)
   * @param value Valeur à vérifier
   * @returns true si la valeur est un objet, false sinon
   */
  export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value)
  }
  
  /**
   * Vérifie si une valeur est un tableau
   * @param value Valeur à vérifier
   * @returns true si la valeur est un tableau, false sinon
   */
  export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
  }
  
  /**
   * Vérifie si une valeur est une fonction
   * @param value Valeur à vérifier
   * @returns true si la valeur est une fonction, false sinon
   */
  export function isFunction(value: unknown): value is Function {
    return typeof value === "function"
  }
  
  /**
   * Vérifie si une valeur est une date valide
   * @param value Valeur à vérifier
   * @returns true si la valeur est une date valide, false sinon
   */
  export function isDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime())
  }
  