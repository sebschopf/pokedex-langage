/**
 * Types utilitaires réutilisables pour l'application
 */

/**
 * Rend certaines propriétés d'un type partiel obligatoires
 *
 * @template T - Le type de base
 * @template K - Les clés des propriétés qui doivent être obligatoires
 *
 * @example
 * // Rendre la propriété 'id' obligatoire dans un objet partiel
 * type PartialUserWithId = WithRequired<Partial<User>, 'id'>
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * Rend certaines propriétés d'un type optionnelles
 *
 * @template T - Le type de base
 * @template K - Les clés des propriétés qui doivent être optionnelles
 *
 * @example
 * // Rendre la propriété 'email' optionnelle dans un objet User
 * type UserWithOptionalEmail = WithOptional<User, 'email'>
 */
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Extrait les clés d'un type dont les valeurs sont d'un certain type
 *
 * @template T - Le type de base
 * @template U - Le type de valeur à rechercher
 *
 * @example
 * // Obtenir toutes les clés dont les valeurs sont des chaînes
 * type StringKeys = KeysOfType<User, string>
 */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]

/**
 * Crée un type avec seulement les propriétés non nullables du type original
 *
 * @template T - Le type de base
 *
 * @example
 * // Obtenir un type User sans les propriétés nullables
 * type NonNullableUser = NonNullableProperties<User>
 */
export type NonNullableProperties<T> = { [K in keyof T]: NonNullable<T[K]> }
