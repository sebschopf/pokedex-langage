/**
 * Interface représentant une relation entre bibliothèque et langage dans la base de données
 * Correspond exactement à la structure de la table library_language dans Supabase
 */
export interface DbLibraryLanguage {
  id: string
  library_id: number
  language_id: number
  primary_language: boolean
  created_at: string
  // autres propriétés éventuelles
}
