import type { DbLibrary } from "@/types/database/library"
import type { Library } from "@/types/models/library"
import { libraryToDb } from "./library-to-db"

/**
 * Type pour l'insertion dans la base de données
 * Garantit que les champs obligatoires sont présents
 */
export type DbLibraryForInsert = {
  name: string
  // Slug peut être null selon le schéma de la base de données
  slug?: string | null
} & Partial<Omit<DbLibrary, "name" | "slug">>

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
    name: library.name,
    // Inclure slug seulement s'il est défini
    ...(library.slug !== undefined && { slug: library.slug }),
  }

  // Ajouter toutes les autres propriétés de dbLibrary sauf name et slug
  const { name: _, slug: __, ...restDbLibrary } = dbLibrary

  // Fusionner les propriétés restantes
  Object.assign(result, restDbLibrary)

  return result
}
