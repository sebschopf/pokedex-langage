/**
 * Utilitaires pour la gestion des valeurs null et undefined
 */

/**
 * Convertit null en undefined
 * @param value Valeur à convertir
 * @returns La valeur d'origine ou undefined si la valeur est null
 */
export function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value
}

/**
 * Convertit undefined en null
 * @param value Valeur à convertir
 * @returns La valeur d'origine ou null si la valeur est undefined
 */
export function undefinedToNull<T>(value: T | undefined): T | null {
  return value === undefined ? null : value
}
