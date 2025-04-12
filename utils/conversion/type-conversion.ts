/**
 * Utilitaires pour la conversion de types
 */

/**
 * Convertit une valeur en nombre
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue (défaut: 0)
 * @returns Nombre converti ou valeur par défaut
 */
export function toNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) {
    return defaultValue
  }

  if (typeof value === "number") {
    return value
  }

  const parsed = Number(value)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Convertit une valeur en nombre ou null
 * @param value Valeur à convertir
 * @returns Nombre converti ou null
 */
export function toNumberOrNull(value: any): number | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === "number") {
    return value
  }

  const parsed = Number(value)
  return isNaN(parsed) ? null : parsed
}

/**
 * Convertit une valeur en chaîne de caractères
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue (défaut: "")
 * @returns Chaîne convertie ou valeur par défaut
 */
export function toString(value: any, defaultValue = ""): string {
  if (value === null || value === undefined) {
    return defaultValue
  }

  return String(value)
}

/**
 * Convertit une valeur en chaîne de caractères ou null
 * @param value Valeur à convertir
 * @returns Chaîne convertie ou null
 */
export function toStringOrNull(value: any): string | null {
  if (value === null || value === undefined) {
    return null
  }

  return String(value)
}

/**
 * Convertit une valeur en booléen
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue (défaut: false)
 * @returns Booléen converti ou valeur par défaut
 */
export function toBoolean(value: any, defaultValue = false): boolean {
  if (value === null || value === undefined) {
    return defaultValue
  }

  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "string") {
    const lowercased = value.toLowerCase()
    return lowercased === "true" || lowercased === "1" || lowercased === "yes" || lowercased === "y"
  }

  if (typeof value === "number") {
    return value === 1
  }

  return Boolean(value)
}

/**
 * Convertit une valeur en booléen ou null
 * @param value Valeur à convertir
 * @returns Booléen converti ou null
 */
export function toBooleanOrNull(value: any): boolean | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "string") {
    const lowercased = value.toLowerCase()
    return lowercased === "true" || lowercased === "1" || lowercased === "yes" || lowercased === "y"
  }

  if (typeof value === "number") {
    return value === 1
  }

  return Boolean(value)
}

/**
 * Convertit une valeur en tableau
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue (défaut: [])
 * @returns Tableau converti ou valeur par défaut
 */
export function toArray<T>(value: any, defaultValue: T[] = []): T[] {
  if (value === null || value === undefined) {
    return defaultValue
  }

  if (Array.isArray(value)) {
    return value
  }

  try {
    // Tenter de parser si c'est une chaîne JSON
    if (typeof value === "string" && (value.startsWith("[") || value.startsWith("{"))) {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : defaultValue
    }
  } catch (e) {
    // Ignorer les erreurs de parsing
  }

  // Si tout échoue, retourner un tableau avec la valeur comme seul élément
  return [value] as T[]
}

/**
 * Convertit une valeur en tableau ou null
 * @param value Valeur à convertir
 * @returns Tableau converti ou null
 */
export function toArrayOrNull<T>(value: any): T[] | null {
  if (value === null || value === undefined) {
    return null
  }

  if (Array.isArray(value)) {
    return value
  }

  try {
    // Tenter de parser si c'est une chaîne JSON
    if (typeof value === "string" && (value.startsWith("[") || value.startsWith("{"))) {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : null
    }
  } catch (e) {
    // Ignorer les erreurs de parsing
  }

  // Si tout échoue, retourner un tableau avec la valeur comme seul élément
  return [value] as T[]
}
