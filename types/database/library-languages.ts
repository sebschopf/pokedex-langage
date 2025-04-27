/**
 * Interface représentant une relation entre bibliothèque et langage dans la base de données
 * Correspond exactement à la structure de la table library_languages dans Supabase
 */
export interface DbLibraryLanguage {
  id: number;
  library_id: number;
  language_id: number;
  primary_language: boolean;
  created_at: string | null;
}
