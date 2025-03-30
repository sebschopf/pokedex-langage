import { createServerSupabaseClient } from "./supabase"
import type { Language } from "@/types/language"
import type { Library } from "@/types/library"

// Interface pour les corrections
export interface Correction {
  id: string
  languageId: string
  languageName?: string
  libraryName?: string
  field: string
  suggestion: string
  type: "language" | "library"
  status: string
  createdAt: string
  updatedAt: string
}

// ===== FONCTIONS DE LECTURE (READ) =====

export async function getLanguages(): Promise<Language[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("languages").select("*").order("name")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    throw new Error("Impossible de récupérer les langages")
  }

  // Conversion du format de la base de données vers le format utilisé par l'application
  return data.map((lang) => ({
    id: lang.id,
    name: lang.name,
    logo: lang.logo,
    shortDescription: lang.short_description,
    type: lang.type as Language["type"],
    usedFor: lang.used_for,
    usageRate: lang.usage_rate,
    createdYear: lang.created_year,
    popularFrameworks: lang.popular_frameworks || [],
    strengths: lang.strengths || [],
    difficulty: lang.difficulty as Language["difficulty"],
    isOpenSource: lang.is_open_source,
    tools: lang.tools as Language["tools"],
    currentVersion: lang.current_version,
    lastUpdated: lang.last_updated,
    license: lang.license,
  }))
}

export async function getLanguageById(id: string): Promise<Language | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("languages").select("*").eq("id", id).single()

  if (error) {
    console.error(`Erreur lors de la récupération du langage avec l'ID ${id}:`, error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    logo: data.logo,
    shortDescription: data.short_description,
    type: data.type as Language["type"],
    usedFor: data.used_for,
    usageRate: data.usage_rate,
    createdYear: data.created_year,
    popularFrameworks: data.popular_frameworks || [],
    strengths: data.strengths || [],
    difficulty: data.difficulty as Language["difficulty"],
    isOpenSource: data.is_open_source,
    tools: data.tools as Language["tools"],
    currentVersion: data.current_version,
    lastUpdated: data.last_updated,
    license: data.license,
  }
}

export async function getLibrariesByLanguageId(languageId: string): Promise<Library[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("libraries").select("*").eq("language_id", languageId).order("name")

  if (error) {
    console.error(`Erreur lors de la récupération des bibliothèques pour le langage ${languageId}:`, error)
    return []
  }

  // Conversion du format de la base de données vers le format utilisé par l'application
  return data.map((lib) => ({
    id: lib.id,
    name: lib.name,
    description: lib.description,
    usedFor: lib.used_for,
    features: lib.features || [],
    officialWebsite: lib.official_website,
    uniqueSellingPoint: lib.unique_selling_point,
    bestFor: lib.best_for,
    version: lib.version,
  }))
}

export async function getLibraryById(id: string): Promise<Library | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("libraries").select("*").eq("id", id).single()

  if (error) {
    console.error(`Erreur lors de la récupération de la bibliothèque avec l'ID ${id}:`, error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    usedFor: data.used_for,
    features: data.features || [],
    officialWebsite: data.official_website,
    uniqueSellingPoint: data.unique_selling_point,
    bestFor: data.best_for,
    version: data.version,
  }
}

export async function getCorrectionsByLanguageId(languageId: string): Promise<Correction[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("corrections")
    .select("*")
    .eq("language_id", languageId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Erreur lors de la récupération des corrections pour le langage ${languageId}:`, error)
    return []
  }

  return data.map((correction) => ({
    id: correction.id,
    languageId: correction.language_id,
    libraryName: correction.library_name || undefined,
    field: correction.field,
    suggestion: correction.suggestion,
    type: correction.type as "language" | "library",
    status: correction.status,
    createdAt: correction.created_at,
    updatedAt: correction.updated_at,
  }))
}

export async function getAllCorrections(): Promise<Correction[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("corrections")
    .select("*, languages(name)")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Erreur lors de la récupération des corrections:", error)
    return []
  }

  return data.map((correction) => ({
    id: correction.id,
    languageId: correction.language_id,
    languageName: correction.languages?.name,
    libraryName: correction.library_name || undefined,
    field: correction.field,
    suggestion: correction.suggestion,
    type: correction.type as "language" | "library",
    status: correction.status,
    createdAt: correction.created_at,
    updatedAt: correction.updated_at,
  }))
}

// ===== FONCTIONS DE CRÉATION (CREATE) =====

export async function createLanguage(language: Omit<Language, "id">): Promise<Language | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("languages")
    .insert({
      name: language.name,
      logo: language.logo,
      short_description: language.shortDescription,
      type: language.type,
      used_for: language.usedFor,
      usage_rate: language.usageRate,
      created_year: language.createdYear,
      popular_frameworks: language.popularFrameworks,
      strengths: language.strengths,
      difficulty: language.difficulty,
      is_open_source: language.isOpenSource,
      tools: language.tools,
      current_version: language.currentVersion,
      last_updated: language.lastUpdated,
      license: language.license,
    })
    .select()
    .single()

  if (error) {
    console.error("Erreur lors de la création du langage:", error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    logo: data.logo,
    shortDescription: data.short_description,
    type: data.type as Language["type"],
    usedFor: data.used_for,
    usageRate: data.usage_rate,
    createdYear: data.created_year,
    popularFrameworks: data.popular_frameworks || [],
    strengths: data.strengths || [],
    difficulty: data.difficulty as Language["difficulty"],
    isOpenSource: data.is_open_source,
    tools: data.tools as Language["tools"],
    currentVersion: data.current_version,
    lastUpdated: data.last_updated,
    license: data.license,
  }
}

export async function createLibrary(library: Omit<Library, "id">, languageId: string): Promise<Library | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("libraries")
    .insert({
      language_id: languageId,
      name: library.name,
      description: library.description,
      used_for: library.usedFor,
      features: library.features,
      official_website: library.officialWebsite,
      unique_selling_point: library.uniqueSellingPoint,
      best_for: library.bestFor,
      version: library.version,
    })
    .select()
    .single()

  if (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    usedFor: data.used_for,
    features: data.features || [],
    officialWebsite: data.official_website,
    uniqueSellingPoint: data.unique_selling_point,
    bestFor: data.best_for,
    version: data.version,
  }
}

export async function createCorrection(
  correction: Omit<Correction, "id" | "createdAt" | "updatedAt">,
): Promise<Correction | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("corrections")
    .insert({
      language_id: correction.languageId,
      library_name: correction.libraryName,
      field: correction.field,
      suggestion: correction.suggestion,
      type: correction.type,
      status: correction.status || "pending",
    })
    .select()
    .single()

  if (error) {
    console.error("Erreur lors de la création de la correction:", error)
    return null
  }

  return {
    id: data.id,
    languageId: data.language_id,
    libraryName: data.library_name || undefined,
    field: data.field,
    suggestion: data.suggestion,
    type: data.type as "language" | "library",
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

// ===== FONCTIONS DE MISE À JOUR (UPDATE) =====

export async function updateLanguage(id: string, language: Partial<Omit<Language, "id">>): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase
    .from("languages")
    .update({
      name: language.name,
      logo: language.logo,
      short_description: language.shortDescription,
      type: language.type,
      used_for: language.usedFor,
      usage_rate: language.usageRate,
      created_year: language.createdYear,
      popular_frameworks: language.popularFrameworks,
      strengths: language.strengths,
      difficulty: language.difficulty,
      is_open_source: language.isOpenSource,
      tools: language.tools,
      current_version: language.currentVersion,
      last_updated: language.lastUpdated,
      license: language.license,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error(`Erreur lors de la mise à jour du langage avec l'ID ${id}:`, error)
    return false
  }

  return true
}

export async function updateLibrary(id: string, library: Partial<Omit<Library, "id">>): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase
    .from("libraries")
    .update({
      name: library.name,
      description: library.description,
      used_for: library.usedFor,
      features: library.features,
      official_website: library.officialWebsite,
      unique_selling_point: library.uniqueSellingPoint,
      best_for: library.bestFor,
      version: library.version,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error(`Erreur lors de la mise à jour de la bibliothèque avec l'ID ${id}:`, error)
    return false
  }

  return true
}

export async function updateCorrectionStatus(id: string, status: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase
    .from("corrections")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error(`Erreur lors de la mise à jour du statut de la correction avec l'ID ${id}:`, error)
    return false
  }

  return true
}

// ===== FONCTIONS DE SUPPRESSION (DELETE) =====

export async function deleteLanguage(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("languages").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression du langage avec l'ID ${id}:`, error)
    return false
  }

  return true
}

export async function deleteLibrary(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("libraries").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression de la bibliothèque avec l'ID ${id}:`, error)
    return false
  }

  return true
}

export async function deleteCorrection(id: string): Promise<boolean> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("corrections").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression de la correction avec l'ID ${id}:`, error)
    return false
  }

  return true
}

