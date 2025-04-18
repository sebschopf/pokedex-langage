/**
 * Interface représentant une relation entre bibliothèque et langage dans l'application
 */
export interface LibraryLanguage {
  id: number
  libraryId: number
  languageId: number
  primaryLanguage: boolean
  createdAt: string | null
}
