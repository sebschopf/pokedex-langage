/**
 * Types pour les paramètres de recherche et filtrage
 * Utilisés pour la communication entre l'URL, les composants et les API
 */

/**
 * Type de base pour les paramètres de recherche de Next.js
 */
export type SearchParamsType = { [key: string]: string | string[] | undefined }

/**
 * Paramètres de recherche pour les langages de programmation
 */
export interface LanguageSearchParams extends SearchParamsType {
  /** Terme de recherche pour filtrer les langages par nom */
  query?: string
  /** Type de langage (ex: "Compilé", "Interprété", etc.) */
  type?: string
  /** Taux d'utilisation minimum (en pourcentage) */
  usageMin?: string
  /** Critère de tri ("name", "usage", "year") */
  sort?: string
  /** Filtre pour les langages open source ("true" ou "false") */
  openSource?: string
  /** Numéro de page pour la pagination */
  page?: string
  /** Nombre d'éléments par page */
  pageSize?: string
}

/**
 * Options pour l'API de langages
 */
export interface LanguageApiOptions {
  /** Numéro de page (commençant à 1) */
  page: number
  /** Nombre d'éléments par page */
  pageSize: number
  /** Terme de recherche */
  search?: string
  /** Catégorie ou type de langage */
  category?: string
  /** Taux d'utilisation minimum */
  minUsage?: number
  /** Critère de tri */
  sort: "name" | "usage" | "year"
  /** Filtre pour les langages open source */
  openSource?: boolean
}

/**
 * Convertit les paramètres de recherche bruts en options pour l'API
 * @param searchParams Paramètres de recherche bruts
 * @returns Options formatées pour l'API
 */
export function convertSearchParamsToApiOptions(searchParams: LanguageSearchParams): LanguageApiOptions {
  return {
    page: Number(searchParams.page) || 1,
    pageSize: Number(searchParams.pageSize) || 100,
    search: searchParams.query,
    category: searchParams.type !== "all" ? searchParams.type : undefined,
    minUsage: searchParams.usageMin ? Number(searchParams.usageMin) : undefined,
    sort: (searchParams.sort as "name" | "usage" | "year") || "name",
    openSource: searchParams.openSource === "true" ? true : searchParams.openSource === "false" ? false : undefined,
  }
}

/**
 * Paramètres de recherche pour les bibliothèques
 */
export interface LibrarySearchParams extends SearchParamsType {
  /** Terme de recherche pour filtrer les bibliothèques par nom */
  query?: string
  /** ID du langage associé */
  languageId?: string
  /** Type de technologie (ex: "framework", "library", etc.) */
  technologyType?: string
  /** Critère de tri */
  sort?: string
  /** Numéro de page pour la pagination */
  page?: string
  /** Nombre d'éléments par page */
  pageSize?: string
}

/**
 * Options pour l'API de bibliothèques
 */
export interface LibraryApiOptions {
  /** Numéro de page */
  page: number
  /** Nombre d'éléments par page */
  pageSize: number
  /** Terme de recherche */
  search?: string
  /** ID du langage associé */
  languageId?: number
  /** Type de technologie */
  technologyType?: string
  /** Critère de tri */
  sort?: string
}
