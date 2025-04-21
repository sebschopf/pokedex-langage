/**
 * Utilitaires pour la conversion de types
 */

/**
 * Convertit une valeur en nombre
 * @param value - Valeur à convertir (peut être un nombre, une chaîne, null ou undefined)
 * @returns Le nombre converti ou 0 si la valeur est invalide
 */
export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined || value === "") {
    return 0
  }

  const num = typeof value === "number" ? value : Number(value)
  return isNaN(num) ? 0 : num
}

/**
 * Convertit une valeur en nombre ou null
 * @param value - Valeur à convertir
 * @returns Le nombre converti ou null si la valeur est invalide
 */
export function toNumberOrNull(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const num = typeof value === "number" ? value : Number(value)
  return isNaN(num) ? null : num
}

/**
 * Convertit une valeur en chaîne ou null
 * @param value - Valeur à convertir
 * @returns La chaîne convertie ou null si la valeur est invalide
 */
export function toStringOrNull(value: string | number | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null
  }

  return String(value)
}

/**
 * Convertit une valeur en booléen ou null
 * @param value - Valeur à convertir
 * @returns Le booléen converti ou null si la valeur est invalide
 */
export function toBooleanOrNull(value: string | number | boolean | null | undefined): boolean | null {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "number") {
    return value !== 0
  }

  if (typeof value === "string") {
    const lowerCaseValue = value.toLowerCase()
    if (lowerCaseValue === "true" || lowerCaseValue === "1") {
      return true
    } else if (lowerCaseValue === "false" || lowerCaseValue === "0") {
      return false
    } else {
      return null
    }
  }

  return null
}

/**
 * Convertit une valeur en tableau ou null
 * @param value - Valeur à convertir
 * @returns Le tableau converti ou null si la valeur est invalide
 */
export function toArrayOrNull<T>(value: T | T[] | null | undefined): T[] | null {
  if (value === null || value === undefined) {
    return null
  }

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

/**
 * Convertit une valeur en chaîne
 * @param value - Valeur à convertir (peut être un nombre, une chaîne, null ou undefined)
 * @returns La chaîne convertie
 */
export function toString(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}

/**
 * Convertit une valeur en booléen
 * @param value - Valeur à convertir
 * @returns Le booléen converti
 */
export function toBoolean(value: string | number | boolean | null | undefined): boolean {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === "boolean") {
    return value
  }

  if (typeof value === "number") {
    return value !== 0
  }

  if (typeof value === "string") {
    const lowerCaseValue = value.toLowerCase()
    return lowerCaseValue === "true" || lowerCaseValue === "1"
  }

  return false
}

/**
 * Convertit une valeur en tableau
 * @param value - Valeur à convertir
 * @returns Le tableau converti
 */
export function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return []
  }

  if (Array.isArray(value)) {
    return value
  }

  return [value]
}

/**
 * Vérifie si un ID est valide (non null, non undefined, non vide)
 * @param id - ID à vérifier
 * @returns true si l'ID est valide, false sinon
 */
export function isValidId(id: string | number | null | undefined): boolean {
  if (id === null || id === undefined || id === "") {
    return false
  }

  if (typeof id === "number") {
    return !isNaN(id)
  }

  return id.trim() !== ""
}

/**
 * Convertit un ID en chaîne de caractères
 * Cette fonction est utile pour garantir la cohérence des types lors des comparaisons d'IDs
 * @param id - ID à convertir (peut être un nombre ou une chaîne)
 * @returns L'ID sous forme de chaîne
 * @throws {Error} Si l'ID est null ou undefined
 */
export function toStringId(id: string | number): string {
  if (id === null || id === undefined) {
    throw new Error("L'ID ne peut pas être null ou undefined")
  }
  return id.toString()
}
