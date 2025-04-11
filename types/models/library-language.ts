/**
 * Interface représentant une relation entre bibliothèque et langage dans l'application
 * Version transformée et normalisée de DbLibraryLanguage
 */
export interface LibraryLanguage {
    createdAt: string | null
    id: number
    languageId: number
    libraryId: number
    primaryLanguage: boolean | null
  }
  