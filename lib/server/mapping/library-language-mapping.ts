import type { DbLibraryLanguage } from "@/types/database/library-language"
import type { LibraryLanguage } from "@/types/models/library-language"

/**
 * Convertit un objet DbLibraryLanguage en LibraryLanguage
 * @param dbLibraryLanguage Objet de la base de données
 * @returns Objet LibraryLanguage pour l'application
 */
export function dbToLibraryLanguage(dbLibraryLanguage: DbLibraryLanguage): LibraryLanguage {
  return {
    id: typeof dbLibraryLanguage.id === "string" ? Number(dbLibraryLanguage.id) : dbLibraryLanguage.id,
    libraryId: dbLibraryLanguage.library_id,
    languageId: dbLibraryLanguage.language_id,
    primaryLanguage: dbLibraryLanguage.primary_language,
    createdAt: dbLibraryLanguage.created_at,
  }
}

/**
 * Convertit un objet LibraryLanguage en DbLibraryLanguage
 * @param libraryLanguage Objet de l'application
 * @returns Objet pour la base de données
 */
export function libraryLanguageToDb(libraryLanguage: Partial<LibraryLanguage>): Partial<DbLibraryLanguage> {
  const dbLibraryLanguage: Partial<DbLibraryLanguage> = {}

  if (libraryLanguage.id !== undefined) dbLibraryLanguage.id = String(libraryLanguage.id)
  if (libraryLanguage.libraryId !== undefined) dbLibraryLanguage.library_id = libraryLanguage.libraryId
  if (libraryLanguage.languageId !== undefined) dbLibraryLanguage.language_id = libraryLanguage.languageId

  // Convertir null en undefined pour les propriétés qui n'acceptent pas null
  if (libraryLanguage.primaryLanguage !== undefined && libraryLanguage.primaryLanguage !== null) {
    dbLibraryLanguage.primary_language = libraryLanguage.primaryLanguage
  }

  if (libraryLanguage.createdAt !== undefined && libraryLanguage.createdAt !== null) {
    dbLibraryLanguage.created_at = libraryLanguage.createdAt
  }

  return dbLibraryLanguage
}
