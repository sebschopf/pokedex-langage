/**
 * Interface représentant un usage de langage dans l'application
 */
export interface LanguageUsage {
  id: number
  languageId: number | null
  categoryId: number | null
  createdAt: string | null
}
