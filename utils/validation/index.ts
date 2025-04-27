/**
 * Utilitaires de validation
 */

// Importation des fonctions depuis d'autres modules si nécessaire
import { isNullOrUndefined as checkNullOrUndefined } from '../type-check/is-primitive';

// Exportation des fonctions importées avec un alias pour éviter les conflits
export { checkNullOrUndefined as isNullOrUndefined };

/**
 * Vérifie si une chaîne est vide
 * @param value Valeur à vérifier
 * @returns true si la valeur est une chaîne vide
 */
export function isEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim() === '';
}

/**
 * Vérifie si une valeur est null, undefined ou une chaîne vide
 * @param value Valeur à vérifier
 * @returns true si la valeur est null, undefined ou une chaîne vide
 */
export function isNullOrEmpty(value: any): boolean {
  return checkNullOrUndefined(value) || isEmptyString(value);
}

/**
 * Vérifie si une valeur est un email valide
 * @param value Valeur à vérifier
 * @returns true si la valeur est un email valid
 */
