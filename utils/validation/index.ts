/**
 * Utilitaires de validation
 */

/**
 * Vérifie si une valeur est null ou undefined
 * @param value Valeur à vérifier
 * @returns true si la valeur est null ou undefined
 */
export function isNullOrUndefined(value: any): value is null | undefined {
    return value === null || value === undefined
  }
  
  /**
   * Vérifie si une chaîne est vide
   * @param value Valeur à vérifier
   * @returns true si la valeur est une chaîne vide
   */
  export function isEmptyString(value: any): boolean {
    return typeof value === "string" && value.trim() === ""
  }
  
  /**
   * Vérifie si une valeur est null, undefined ou une chaîne vide
   * @param value Valeur à vérifier
   * @returns true si la valeur est null, undefined ou une chaîne vide
   */
  export function isNullOrEmpty(value: any): boolean {
    return isNullOrUndefined(value) || isEmptyString(value)
  }
  
  /**
   * Vérifie si une valeur est un nombre
   * @param value Valeur à vérifier
   * @returns true si la valeur est un nombre
   */
  export function isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value)
  }
  
  /**
   * Vérifie si une valeur est une chaîne
   * @param value Valeur à vérifier
   * @returns true si la valeur est une chaîne
   */
  export function isString(value: any): value is string {
    return typeof value === "string"
  }
  
  /**
   * Vérifie si une valeur est un booléen
   * @param value Valeur à vérifier
   * @returns true si la valeur est un booléen
   */
  export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean"
  }
  