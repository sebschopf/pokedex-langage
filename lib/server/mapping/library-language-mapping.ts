import type { DbLibraryLanguage } from "@/types/database"
import type { LibraryLanguage } from "@/types/models"

/**
 * Convertit un objet DbLibraryLanguage en LibraryLanguage
 * @param dbLibraryLanguage Objet de la base de données
 * @returns Objet LibraryLanguage pour l'application
 */
export function dbToLibraryLanguage(dbLibraryLanguage: DbLibraryLanguage): LibraryLanguage {
  return {
    id: dbLibraryLanguage.id,
    createdAt: dbLibraryLanguage.created_at,
    languageId: dbLibraryLanguage.language_id,
    libraryId: dbLibraryLanguage.library_id,
    primaryLanguage: dbLibraryLanguage.primary_language,
  }
}

/**
 * Convertit un objet LibraryLanguage en DbLibraryLanguage
 * @param libraryLanguage Objet de l'application
 * @returns Objet pour la base de données
 */
export function libraryLanguageToDb(libraryLanguage: Partial<LibraryLanguage>): Partial<DbLibraryLanguage> {
  const dbLibraryLanguage: Partial<DbLibraryLanguage> = {}

  if (libraryLanguage.id !== undefined) dbLibraryLanguage.id = libraryLanguage.id
  if (libraryLanguage.createdAt !== undefined) dbLibraryLanguage.created_at = libraryLanguage.createdAt
  if (libraryLanguage.languageId !== undefined) dbLibraryLanguage.language_id = libraryLanguage.languageId
  if (libraryLanguage.libraryId !== undefined) dbLibraryLanguage.library_id = libraryLanguage.libraryId
  if (libraryLanguage.primaryLanguage !== undefined)
    dbLibraryLanguage.primary_language = libraryLanguage.primaryLanguage

  return dbLibraryLanguage
}
