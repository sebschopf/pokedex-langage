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

/**
 * Utilise une valeur par défaut si la valeur est null ou undefined
 * @param value Valeur à vérifier
 * @param defaultValue Valeur par défaut à utiliser
 * @returns La valeur d'origine ou la valeur par défaut
 */
export function nullToDefault<T>(value: T | null | undefined, defaultValue: T): T {
  return value === null || value === undefined ? defaultValue : value
}
