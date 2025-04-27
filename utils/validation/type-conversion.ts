/**
 * Ce fichier est déprécié. Utilisez le module utils/conversion/type-conversion.ts à la place.
 * @deprecated
 */

// Réexporter depuis le nouveau module pour maintenir la compatibilité
export * from '../conversion/type-conversion';

// Avertissement de console en développement
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'Avertissement: utils/validation/type-conversion.ts est déprécié. Utilisez utils/conversion/type-conversion.ts à la place.',
  );
}

/**
 * Utilitaires pour la conversion de types
 */

/**
 * Convertit une valeur en nombre
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue
 * @returns Nombre converti ou valeur par défaut
 */
export function toNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  if (typeof value === 'number') {
    return value;
  }

  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Convertit une valeur en chaîne de caractères
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue
 * @returns Chaîne convertie ou valeur par défaut
 */
export function toString(value: any, defaultValue = ''): string {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  return String(value);
}

/**
 * Convertit une valeur en booléen
 * @param value Valeur à convertir
 * @param defaultValue Valeur par défaut si la conversion échoue
 * @returns Booléen converti ou valeur par défaut
 */
export function toBoolean(value: any, defaultValue = false): boolean {
  if (value === null || value === undefined) {
    return defaultValue;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }

  return Boolean(value);
}

/**
 * Convertit une valeur null en undefined
 * @param value Valeur à convertir
 * @returns La valeur d'origine ou undefined si la valeur est null
 */
export function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}
