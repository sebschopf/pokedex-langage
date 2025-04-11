/**
 * Type représentant un profil utilisateur tel que stocké dans la base de données
 * Correspond exactement à la structure de la table 'profiles' dans Supabase
 */
export type DbProfile = {
  avatar_url: string | null
  bio: string | null
  created_at: string | null
  full_name: string | null
  id: string
  updated_at: string | null
  username: string | null
  website: string | null
}
