/**
 * Utilitaires pour la manipulation des tableaux
 */

/**
 * Filtre les valeurs null et undefined d'un tableau
 * @template T - Le type des éléments non-null du tableau
 * @param array - Le tableau à filtrer
 * @returns Un tableau sans valeurs null ou undefined
 *
 * @example
 * // Filtrer les valeurs null d'un tableau de nombres
 * const numbers = [1, null, 3, undefined, 5];
 * const filteredNumbers = filterNonNullable(numbers); // [1, 3, 5]
 */
export function filterNonNullable<T>(array: Array<T | null | undefined>): Array<T> {
    return array.filter((item): item is T => item !== null && item !== undefined)
  }
  
  /**
   * Vérifie si un tableau est vide
   * @param array - Le tableau à vérifier
   * @returns true si le tableau est vide ou null/undefined, false sinon
   */
  export function isEmpty<T>(array: Array<T> | null | undefined): boolean {
    return !array || array.length === 0
  }
  
  /**
   * Groupe les éléments d'un tableau par une clé
   * @template T - Le type des éléments du tableau
   * @template K - Le type de la clé
   * @param array - Le tableau à grouper
   * @param keyFn - Fonction qui extrait la clé de chaque élément
   * @returns Un objet avec les éléments groupés par clé
   *
   * @example
   * // Grouper des utilisateurs par rôle
   * const users = [{ id: 1, role: 'admin' }, { id: 2, role: 'user' }];
   * const grouped = groupBy(users, user => user.role);
   * // { admin: [{ id: 1, role: 'admin' }], user: [{ id: 2, role: 'user' }] }
   */
  export function groupBy<T, K extends string | number | symbol>(
    array: Array<T>,
    keyFn: (item: T) => K,
  ): Record<K, Array<T>> {
    return array.reduce(
      (result, item) => {
        const key = keyFn(item)
        ;(result[key] = result[key] || []).push(item)
        return result
      },
      {} as Record<K, Array<T>>,
    )
  }
  
  /**
   * Supprime les doublons d'un tableau
   * @template T - Le type des éléments du tableau
   * @param array - Le tableau avec des doublons potentiels
   * @param keyFn - Fonction optionnelle qui extrait une clé unique pour chaque élément
   * @returns Un tableau sans doublons
   *
   * @example
   * // Supprimer les doublons d'un tableau de nombres
   * const numbers = [1, 2, 2, 3, 4, 4, 5];
   * const unique = unique(numbers); // [1, 2, 3, 4, 5]
   *
   * // Supprimer les doublons d'un tableau d'objets par ID
   * const users = [{ id: 1, name: 'Alice' }, { id: 1, name: 'Bob' }, { id: 2, name: 'Charlie' }];
   * const uniqueUsers = unique(users, user => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Charlie' }]
   */
  export function unique<T>(array: Array<T>, keyFn?: (item: T) => any): Array<T> {
    if (!keyFn) {
      // Utiliser Array.from au lieu de l'opérateur de décomposition
      return Array.from(new Set(array))
    }
  
    const seen = new Set()
    return array.filter((item) => {
      const key = keyFn(item)
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }
  