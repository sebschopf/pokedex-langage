import type { DbLibraryLanguage } from '@/types/database/library-languages';
import type { LibraryLanguage } from '@/types/models/library-languages';

/**
 * Convertit un objet de relation bibliothèque-langage de la base de données en objet pour l'application
 */
export function dbToLibraryLanguage(dbLibraryLanguage: DbLibraryLanguage): LibraryLanguage {
  return {
    id: dbLibraryLanguage.id,
    libraryId: dbLibraryLanguage.library_id,
    languageId: dbLibraryLanguage.language_id,
    primaryLanguage: dbLibraryLanguage.primary_language,
    createdAt: dbLibraryLanguage.created_at,
  };
}

/**
 * Convertit un objet de relation bibliothèque-langage de l'application en objet pour la base de données
 */
export function libraryLanguageToDb(
  libraryLanguage: Partial<LibraryLanguage>,
): Partial<DbLibraryLanguage> {
  const dbLibraryLanguage: Partial<DbLibraryLanguage> = {};

  if (libraryLanguage.id !== undefined) dbLibraryLanguage.id = libraryLanguage.id;
  if (libraryLanguage.libraryId !== undefined)
    dbLibraryLanguage.library_id = libraryLanguage.libraryId;
  if (libraryLanguage.languageId !== undefined)
    dbLibraryLanguage.language_id = libraryLanguage.languageId;
  if (libraryLanguage.primaryLanguage !== undefined)
    dbLibraryLanguage.primary_language = libraryLanguage.primaryLanguage;
  if (libraryLanguage.createdAt !== undefined)
    dbLibraryLanguage.created_at = libraryLanguage.createdAt;

  return dbLibraryLanguage;
}
