/**
 * Interface représentant un profil utilisateur dans la base de données
 * Correspond exactement à la structure de la table profiles dans Supabase
 */
export interface DbProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Interface représentant un utilisateur de base dans la base de données
 * Correspond aux données d'authentification de Supabase Auth
 */
export interface DbUser {
  id: string;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Interface représentant un utilisateur avec son profil dans la base de données
 */
export interface DbUserWithProfile extends DbUser {
  profile?: DbProfile;
  role?: string;
}
