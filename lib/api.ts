import { createServerSupabaseClient } from "./supabase"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"
// Importer depuis index.ts qui réexporte correctement maintenant
import { dbToLanguage, dbToLibrary } from "@/types"

// Correction pour l'erreur de type string | undefined
export async function getLanguageBySlug(slug: string): Promise<Language | null> {
  try {
    console.log("Recherche du langage avec le slug:", slug)

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      console.error("Client Supabase non initialisé")
      return null
    }

    // D'abord, essayez de trouver par slug
    let { data, error } = await supabase.from("languages").select("*").eq("slug", slug).single()

    // Si aucun résultat, essayez de trouver par ID
    if (!data && !error) {
      console.log("Aucun langage trouvé avec ce slug, essai avec l'ID")
      const { data: dataById, error: errorById } = await supabase.from("languages").select("*").eq("id", slug).single()

      data = dataById
      error = errorById
    }

    // Si toujours aucun résultat, essayez de trouver par nom transformé en slug
    if (!data && !error) {
      console.log("Aucun langage trouvé avec cet ID, essai avec le nom")
      const { data: allLanguages } = await supabase.from("languages").select("*")

      if (allLanguages) {
        // Recherche d'un langage dont le nom transformé en slug correspond
        const matchingLanguage = allLanguages.find((lang) => {
          const nameSlug = lang.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
          return nameSlug === slug
        })

        if (matchingLanguage) {
          console.log("Langage trouvé par correspondance de nom:", matchingLanguage.name)
          data = matchingLanguage
        }
      }
    }

    if (error) {
      console.error("Error fetching language by slug:", error)
      return null
    }

    // Si dbToLanguage n'est pas disponible, créer une fonction locale
    const convertLanguage = (data: any): Language => {
      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        // Propriétés en camelCase
        createdYear: data.year_created,
        creator: data.creator,
        description: data.description,
        logo: data.logo_path,
        shortDescription: data.short_description,
        type: data.type,
        usedFor: data.used_for,
        usageRate: data.usage_rate,
        isOpenSource: data.is_open_source,
        strengths: data.strengths || [],
        popularFrameworks: data.popular_frameworks || [],
        tools: data.tools,
        createdAt: data.created_at,
        updatedAt: data.updated_at,

        // Propriétés en snake_case
        year_created: data.year_created,
        logo_path: data.logo_path,
        short_description: data.short_description,
        used_for: data.used_for,
        usage_rate: data.usage_rate,
        is_open_source: data.is_open_source,
        popular_frameworks: data.popular_frameworks || [],
        created_at: data.created_at,
        updated_at: data.updated_at,
      }
    }

    // Utiliser la fonction locale ou importée
    return data ? (dbToLanguage ? dbToLanguage(data) : convertLanguage(data)) : null
  } catch (error) {
    console.error("Error fetching language by slug:", error)
    return null
  }
}

// Correction pour l'erreur de type Library[]
export async function getFrameworksByLanguageId(languageId: string): Promise<Library[]> {
  try {
    console.log("Récupération des frameworks pour le langage ID:", languageId)

    // Si languageId est undefined ou null, retourner un tableau vide
    if (!languageId) {
      console.log("ID de langage non défini, retour d'un tableau vide")
      return []
    }

    const supabase = createServerSupabaseClient()

    if (!supabase) {
      console.error("Client Supabase non initialisé")
      return []
    }

    // Récupérer les bibliothèques/frameworks depuis la table libraries
    const { data, error } = await supabase
      .from("libraries")
      .select("*")
      .eq("language_id", languageId)
      .order("popularity", { ascending: false })

    if (error) {
      console.error("Error fetching libraries for language:", error)
      return []
    }

    console.log(`Trouvé ${data?.length || 0} frameworks dans la table libraries`)

    // Fonction locale de conversion au cas où dbToLibrary n'est pas disponible
    const convertLibrary = (lib: any): Library => {
      return {
        id: lib.id,
        name: lib.name,
        languageId: lib.language_id,
        description: lib.description,
        officialWebsite: lib.official_website,
        githubUrl: lib.github_url,
        logoPath: lib.logo_path,
        popularity: lib.popularity,
        isOpenSource: lib.is_open_source,
        features: lib.features || [],
        uniqueSellingPoint: lib.unique_selling_point,
        bestFor: lib.best_for,
        usedFor: lib.used_for,
        documentationUrl: lib.documentation_url,
        version: lib.version,
        createdAt: lib.created_at,
        updatedAt: lib.updated_at,

        // Propriétés en snake_case
        language_id: lib.language_id,
        official_website: lib.official_website,
        github_url: lib.github_url,
        logo_path: lib.logo_path,
        is_open_source: lib.is_open_source,
        created_at: lib.created_at,
        updated_at: lib.updated_at,
        unique_selling_point: lib.unique_selling_point,
        best_for: lib.best_for,
        used_for: lib.used_for,
        documentation_url: lib.documentation_url,
      }
    }

    // Si des bibliothèques sont trouvées, les convertir
    if (data && data.length > 0) {
      return data.map(dbToLibrary || convertLibrary)
    }

    // Si aucune bibliothèque n'est trouvée, essayer de récupérer depuis popular_frameworks
    console.log("Aucune bibliothèque trouvée, essai avec popular_frameworks")
    const { data: langData, error: langError } = await supabase
      .from("languages")
      .select("popular_frameworks")
      .eq("id", languageId)
      .single()

    if (langError) {
      console.error("Error fetching language for frameworks:", langError)
      return []
    }

    // Si le langage a des frameworks populaires, les transformer en objets Library
    if (langData && langData.popular_frameworks && Array.isArray(langData.popular_frameworks)) {
      console.log(`Trouvé ${langData.popular_frameworks.length} frameworks dans popular_frameworks`)
      return langData.popular_frameworks.map((name, index) => ({
        id: `${languageId}-${index}`,
        name,
        // Garder languageId comme string
        languageId,
        language_id: languageId,
        description: `Framework populaire pour ${name}`,
        usedFor: "",
        used_for: "",
        features: [],
        officialWebsite: "",
        official_website: "",
        uniqueSellingPoint: "",
        unique_selling_point: "",
        bestFor: "",
        best_for: "",
        // Propriétés optionnelles
        version: null,
        githubUrl: null,
        github_url: null,
        logoPath: null,
        logo_path: null,
        popularity: null,
        isOpenSource: true,
        is_open_source: true,
        documentationUrl: null,
        documentation_url: null,
        createdAt: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    }

    console.log("Aucun framework trouvé")
    return []
  } catch (error) {
    console.error("Error in getFrameworksByLanguageId:", error)
    return []
  }
}

