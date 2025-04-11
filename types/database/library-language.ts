// ce fichier est utilisé pour les language dans la base de données
// il est utilisé pour la table language dans Supabase
// respecter le style snake_case car c'est le style de la base de données
export type DbLibraryLanguage = {
  id: string;
  libraryId: string;
  languageId: string;
  primaryLanguage: boolean;
  createdAt: string;
}