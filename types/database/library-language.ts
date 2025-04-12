// ce fichier est utilisé pour les languages dans la base de données
// il est utilisé pour la table library_language dans Supabase
export interface DbLibraryLanguage {
  id: string // 
  library_id: number
  language_id: number
  primary_language: boolean
  created_at: string
  // autres propriétés éventuelles
}