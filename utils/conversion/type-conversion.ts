/**
 * Convertit une valeur en nombre
 * @param value Valeur à convertir
 * @returns Nombre converti
 */
export function toNumber(value: any): number {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

/**
 * Convertit une valeur en nombre ou null
 * @param value Valeur à convertir
 * @returns Nombre converti ou null
 */
export function toNumberOrNull(value: any): number | null {
  if (value === null || value === undefined) return null
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Number(value)
    return isNaN(parsed) ? null : parsed
  }
  return null
}

/**
 * Convertit une valeur en chaîne de caractères
 * @param value Valeur à convertir
 * @returns Chaîne de caractères convertie
 */
export function toString(value: any): string {
  if (typeof value === "string") return value
  if (value === null || value === undefined) return ""
  return String(value)
}

/**
 * Convertit une valeur en chaîne de caractères ou null
 * @param value Valeur à convertir
 * @returns Chaîne de caractères convertie ou null
 */
export function toStringOrNull(value: any): string | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") return value
  return String(value)
}

/**
 * Convertit une valeur en booléen
 * @param value Valeur à convertir
 * @returns Booléen converti
 */
export function toBoolean(value: any): boolean {
  if (typeof value === "boolean") return value
  if (typeof value === "string") return value.toLowerCase() === "true"
  return Boolean(value)
}

/**
 * Convertit une valeur en booléen ou null
 * @param value Valeur à convertir
 * @returns Booléen converti ou null
 */
export function toBooleanOrNull(value: any): boolean | null {
  if (value === null || value === undefined) return null
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true
    if (value.toLowerCase() === "false") return false
    return null
  }
  return null
}

/**
 * Convertit une valeur en tableau
 * @param value Valeur à convertir
 * @returns Tableau converti
 */
export function toArray<T>(value: any): T[] {
  if (Array.isArray(value)) return value
  if (value === null || value === undefined) return []
  return [value] as T[]
}

/**
 * Convertit une valeur en tableau ou null
 * @param value Valeur à convertir
 * @returns Tableau converti ou null
 */
export function toArrayOrNull<T>(value: any): T[] | null {
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) return value
  return [value] as T[]
}
