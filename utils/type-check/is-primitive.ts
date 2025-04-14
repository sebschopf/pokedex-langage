/**
 * Utilitaires pour vérifier les types primitifs
 */

/**
 * Vérifie si une valeur est un nombre
 * @param value Valeur à vérifier
 * @returns true si la valeur est un nombre
 */
export function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value)
  }
  
  /**
   * Vérifie si une valeur est une chaîne
   * @param value Valeur à vérifier
   * @returns true si la valeur est une chaîne
   */
  export function isString(value: unknown): value is string {
    return typeof value === "string"
  }
  
  /**
   * Vérifie si une valeur est un booléen
   * @param value Valeur à vérifier
   * @returns true si la valeur est un booléen
   */
  export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean"
  }
  
  /**
   * Vérifie si une valeur est undefined
   * @param value Valeur à vérifier
   * @returns true si la valeur est undefined
   */
  export function isUndefined(value: unknown): value is undefined {
    return typeof value === "undefined"
  }
  
  /**
   * Vérifie si une valeur est null
   * @param value Valeur à vérifier
   * @returns true si la valeur est null
   */
  export function isNull(value: unknown): value is null {
    return value === null
  }
  
  /**
   * Vérifie si une valeur est null ou undefined
   * @param value Valeur à vérifier
   * @returns true si la valeur est null ou undefined
   */
  export function isNullOrUndefined(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value)
  }
  
  /**
   * Vérifie si une valeur est un symbole
   * @param value Valeur à vérifier
   * @returns true si la valeur est un symbole
   */
  export function isSymbol(value: unknown): value is symbol {
    return typeof value === "symbol"
  }
  
  /**
   * Vérifie si une valeur est une fonction
   * @param value Valeur à vérifier
   * @returns true si la valeur est une fonction
   */
  export function isFunction(value: unknown): value is Function {
    return typeof value === "function"
  }
  