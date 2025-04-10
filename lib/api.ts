import { createServerSupabaseClient } from "./supabase-server"
import type { Library } from "@/types/library"
import type { Language } from "@/types/language"
import { dbToLibrary, dbToLanguage } from "./database-mapping"

// Type pour les options de filtrage
export interface FrameworkFilterOptions {
  minPopularity?: number
  type?: string
  limit?: number
  sortBy?: "popularity" | "name" | "created_at"
  sortOrder?: "asc" | "desc"
}

// Cache pour stocker les résultats
interface CacheEntry<T> {
  data: T
  timestamp: number
}

// Cache en mémoire avec expiration
const frameworksCache = new Map<string, CacheEntry<Library[]>>()
const languagesCache = new Map<string, CacheEntry<Language>>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes en millisecondes

/**
 * Vide le cache des frameworks
 */
export function clearFrameworksCache(): void {
  frameworksCache.clear()
}

/**
 * Vide le cache des langages
 */
export function clearLanguagesCache(): void {
  languagesCache.clear()
}

/**
 * Récupère un langage par son slug
 * @param slug Le slug du langage
 * @param skipCache Ignorer le cache et forcer une nouvelle requête (optionnel)
 * @returns Le langage ou null si non trouvé
 */
export async function getLanguageBySlug(slug: string, skipCache = false): Promise<Language | null> {
  try {
    // Validation du slug
    if (!slug) {
      throw new Error("Slug non défini ou invalide")
    }

    // Vérifier le cache si skipCache est false
    if (!skipCache) {
      const cachedData = languagesCache.get(slug)
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        console.log(`Utilisation des données en cache pour le langage ${slug}`)
        return cachedData.data
      }
    }

    const supabase = createServerSupabaseClient()
    if (!supabase) {
      throw new Error("Client Supabase non initialisé")
    }

    // Récupérer le langage par son slug
    const { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Code d'erreur pour "No rows found"
        return null
      }
      throw new Error(`Erreur lors de la récupération du langage: ${error.message}`)
    }

    if (!data) {
      return null
    }

    // Convertir les données et mettre en cache
    const language = dbToLanguage(data)
    languagesCache.set(slug, {
      data: language,
      timestamp: Date.now(),
    })

    return language
  } catch (error) {
    // Gestion structurée des erreurs
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue lors de la récupération du langage"

    console.error(`Erreur dans getLanguageBySlug: ${errorMessage}`, error)
    return null
  }
}

/**
 * Récupère les frameworks associés à un langage avec options de filtrage et mise en cache
 * @param languageId L'ID du langage
 * @param options Options de filtrage (optionnel)
 * @param skipCache Ignorer le cache et forcer une nouvelle requête (optionnel)
 * @returns Liste des frameworks/bibliothèques
 */
export async function getFrameworksByLanguageId(
  languageId: string,
  options: FrameworkFilterOptions = {},
  skipCache = false,
): Promise<Library[]> {
  try {
    // Validation de l'ID du langage
    if (!languageId) {
      throw new Error("ID de langage non défini ou invalide")
    }

    // Générer une clé de cache unique basée sur l'ID et les options
    const cacheKey = `${languageId}-${JSON.stringify(options)}`

    // Vérifier le cache si skipCache est false
    if (!skipCache) {
      const cachedData = frameworksCache.get(cacheKey)
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
        console.log(`Utilisation des données en cache pour le langage ${languageId}`)
        return cachedData.data
      }
    }

    const supabase = createServerSupabaseClient()
    if (!supabase) {
      throw new Error("Client Supabase non initialisé")
    }

    // Construire la requête de base
    let query = supabase.from("libraries").select("*").eq("language_id", languageId)

    // Appliquer les filtres si spécifiés
    if (options.minPopularity !== undefined) {
      query = query.gte("popularity", options.minPopularity)
    }

    if (options.type) {
      query = query.eq("technology_type", options.type)
    }

    // Appliquer le tri
    const sortField = options.sortBy || "popularity"
    const sortDirection = options.sortOrder === "asc" ? true : false
    query = query.order(sortField, { ascending: sortDirection })

    // Appliquer la limite si spécifiée
    if (options.limit) {
      query = query.limit(options.limit)
    }

    // Exécuter la requête
    const { data, error } = await query

    if (error) {
      throw new Error(`Erreur lors de la récupération des bibliothèques: ${error.message}`)
    }

    // Si des bibliothèques sont trouvées, les convertir et mettre en cache
    if (data && data.length > 0) {
      const libraries = data.map((item) => dbToLibrary(item))

      // Mettre en cache les résultats
      frameworksCache.set(cacheKey, {
        data: libraries,
        timestamp: Date.now(),
      })

      return libraries
    }

    // Si aucune bibliothèque n'est trouvée, essayer de récupérer depuis popular_frameworks
    const { data: langData, error: langError } = await supabase
      .from("languages")
      .select("popular_frameworks, name")
      .eq("id", languageId)
      .single()

    if (langError) {
      throw new Error(`Erreur lors de la récupération du langage: ${langError.message}`)
    }

    // Si le langage a des frameworks populaires, les transformer en objets Library
    if (langData?.popular_frameworks && Array.isArray(langData.popular_frameworks)) {
      const languageName = langData.name || "ce langage"

      const libraries = langData.popular_frameworks.map((name, index) => {
        // Créer un objet au format DB pour utiliser la fonction de conversion
        // Inclure toutes les propriétés requises par DbLibrary
        const dbLibrary = {
          id: `${languageId}-${index}`,
          name,
          language_id: languageId,
          description: `Framework populaire pour ${languageName}`,
          official_website: `https://www.google.com/search?q=${name}+${languageName}+framework`,
          features: ["Intégration avec " + languageName, "Facilité d'utilisation", "Documentation"],
          unique_selling_point: `Extension spécialisée pour ${languageName}`,
          best_for: `Projets ${languageName} nécessitant des fonctionnalités supplémentaires`,
          used_for: [`Extension des fonctionnalités de ${languageName}`], // Corrigé pour être un tableau
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // Propriétés manquantes ajoutées avec des valeurs par défaut
          github_url: null,
          logo_path: null,
          popularity: null,
          is_open_source: null,
          documentation_url: null,
          version: null,
          technology_type: null,
          sub_type: null,
        }

        // Utiliser la fonction de conversion pour garantir la cohérence
        return dbToLibrary(dbLibrary)
      })

      // Appliquer le tri et la limite aux frameworks générés
      let sortedLibraries = [...libraries]

      if (options.sortBy === "name") {
        sortedLibraries.sort((a, b) => {
          return options.sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        })
      }

      if (options.limit) {
        sortedLibraries = sortedLibraries.slice(0, options.limit)
      }

      // Mettre en cache les résultats
      frameworksCache.set(cacheKey, {
        data: sortedLibraries,
        timestamp: Date.now(),
      })

      return sortedLibraries
    }

    // Aucun framework trouvé
    return []
  } catch (error) {
    // Gestion structurée des erreurs
    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue lors de la récupération des frameworks"

    console.error(`Erreur dans getFrameworksByLanguageId: ${errorMessage}`, error)

    // On peut choisir de retourner un tableau vide ou de propager l'erreur
    // Pour maintenir la compatibilité, on retourne un tableau vide
    return []
  }
}
