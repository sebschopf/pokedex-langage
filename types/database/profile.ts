/**
 * Interface représentant un profil utilisateur dans la base de données
 * Correspond exactement à la structure de la table profiles dans Supabase
 */
export interface DbProfile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  website: string | null
  created_at: string | null
  updated_at: string | null
  // Ces champs sont optionnels car ils ne sont pas toujours présents dans les données retournées
  email?: string
  is_verified?: boolean | null
}
