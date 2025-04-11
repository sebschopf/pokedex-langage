/**
 * Utilitaires pour la conversion entre null et undefined
 * À utiliser pour harmoniser les types entre Supabase (qui utilise null) et l'interface (qui peut utiliser undefined)
 */

/**
 * Convertit une valeur null en undefined
 * @param value Valeur à convertir
 * @returns La valeur d'origine ou undefined si la valeur est null
 */
export function nullToUndefined<T>(value: T | null): T | undefined {
    return value === null ? undefined : value
  }
  
  /**
   * Convertit une valeur undefined en null
   * @param value Valeur à convertir
   * @returns La valeur d'origine ou null si la valeur est undefined
   */
  export function undefinedToNull<T>(value: T | undefined): T | null {
    return value === undefined ? null : value
  }
  
  /**
   * Convertit une valeur null en valeur par défaut
   * @param value Valeur à convertir
   * @param defaultValue Valeur par défaut à utiliser si la valeur est null
   * @returns La valeur d'origine ou la valeur par défaut si la valeur est null
   */
  export function nullToDefault<T>(value: T | null, defaultValue: T): T {
    return value === null ? defaultValue : value
  }
  
  /**
   * Convertit une valeur null en chaîne d'affichage
   * @param value Valeur à convertir
   * @param placeholder Texte à afficher si la valeur est null
   * @returns La valeur d'origine ou le placeholder si la valeur est null
   */
  export function nullToDisplayString(value: string | null, placeholder = "Non défini"): string {
    return value === null ? placeholder : value
  }
  
  /**
   * Convertit une valeur null en tableau vide
   * @param value Valeur à convertir
   * @returns La valeur d'origine ou un tableau vide si la valeur est null
   */
  export function nullToEmptyArray<T>(value: T[] | null): T[] {
    return value === null ? [] : value
  }
  
  /**
   * Convertit une valeur null en objet vide
   * @param value Valeur à convertir
   * @returns La valeur d'origine ou un objet vide si la valeur est null
   */
  export function nullToEmptyObject<T extends object>(value: T | null): T {
    return value === null ? ({} as T) : value
  }
  