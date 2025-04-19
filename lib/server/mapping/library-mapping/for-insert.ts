import type { Library } from "@/types/models/library"
import { libraryToDb } from "./library-to-db"

/**
 * Type pour l'insertion dans la base de données
 * Garantit que les champs obligatoires sont présents
 */
export type DbLibraryForInsert = {
  name: string // name est obligatoire
  slug?: string | null
  language_id?: number | null
  description?: string | null
  official_website?: string | null
  github_url?: string | null
  logo_path?: string | null
  popularity?: number | null
  is_open_source?: boolean | null
  created_at?: string | null
  updated_at?: string | null
  features?: string[] | null
  unique_selling_point?: string | null
  best_for?: string | null
  used_for?: string | null
  documentation_url?: string | null
  version?: string | null
  technology_type?: string | null
  subtype?: string | null
}

/**
 * Convertit un objet Library en objet pour l'insertion dans la base de données
 * Garantit que tous les champs obligatoires sont présents
 * @param library Objet Library à convertir pour l'insertion
 * @returns Objet prêt pour l'insertion dans Supabase
 * @throws {Error} Si les champs obligatoires sont manquants
 */
export function libraryToDbForInsert(library: Omit<Library, "id">): DbLibraryForInsert {
  // Validation des champs obligatoires
  if (!library.name) {
    throw new Error("Le champ 'name' est obligatoire pour l'insertion")
  }

  // Convertir en format DB
  const dbLibrary = libraryToDb(library)

  // Créer un nouvel objet avec les propriétés requises
  const result: DbLibraryForInsert = {
    name: library.name, // Garantir que name est présent
    // Ajouter les autres propriétés avec des valeurs par défaut nullables
    slug: library.slug || null,
    language_id: dbLibrary.language_id || null,
    description: dbLibrary.description || null,
    official_website: dbLibrary.official_website || null,
    github_url: dbLibrary.github_url || null,
    logo_path: dbLibrary.logo_path || null,
    popularity: dbLibrary.popularity || null,
    is_open_source: dbLibrary.is_open_source || null,
    created_at: dbLibrary.created_at || null,
    updated_at: dbLibrary.updated_at || null,
    features: dbLibrary.features || null,
    unique_selling_point: dbLibrary.unique_selling_point || null,
    best_for: dbLibrary.best_for || null,
    used_for: dbLibrary.used_for || null,
    documentation_url: dbLibrary.documentation_url || null,
    version: dbLibrary.version || null,
    technology_type: dbLibrary.technology_type || null,
    subtype: dbLibrary.subtype || null,
  }

  return result
}
