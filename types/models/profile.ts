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

/**
 * Interface représentant un profil utilisateur dans l'application
 * Utilise la convention camelCase pour les noms de propriétés
 */
export interface Profile {
  id: string
  username: string | null
  createdAt: string | null
  updatedAt: string | null
  avatarUrl: string | null
  fullName: string | null
  bio: string | null
  website: string | null
}

/**
 * Interface représentant un utilisateur de base dans l'application
 */
export interface User {
  id: string
  email: string | null
  createdAt: string | null
  updatedAt: string | null
}

/**
 * Interface représentant un utilisateur avec son profil dans l'application
 */
export interface UserWithProfile extends User {
  profile?: Profile
  role?: string
}

/**
 * Convertit un profil de la base de données en profil pour l'application
 */
export function dbProfileToProfile(dbProfile: DbProfile): Profile {
  return {
    id: dbProfile.id,
    username: dbProfile.username,
    fullName: dbProfile.full_name,
    avatarUrl: dbProfile.avatar_url,
    bio: dbProfile.bio,
    website: dbProfile.website,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at,
  }
}

/**
 * Convertit un profil de l'application en profil pour la base de données
 */
export function profileToDbProfile(profile: Profile): DbProfile {
  return {
    id: profile.id,
    username: profile.username,
    full_name: profile.fullName,
    avatar_url: profile.avatarUrl,
    bio: profile.bio,
    website: profile.website,
    created_at: profile.createdAt,
    updated_at: profile.updatedAt,
    email: undefined,
    is_verified: undefined,
  }
}
