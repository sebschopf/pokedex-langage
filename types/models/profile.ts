/**
 * Interface représentant un profil utilisateur dans l'application
 * Utilise la convention camelCase pour les noms de propriétés
 */
export interface Profile {
  id: string;
  username: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  website: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Interface représentant un profil utilisateur avec des informations d'authentification
 * Combine les données de profil avec les données d'authentification de Supabase Auth
 */
export interface ProfileWithAuth extends Profile {
  email?: string | null;
  isVerified?: boolean | null;
}

/**
 * Interface représentant un utilisateur de base dans l'application
 */
export interface User {
  id: string;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * Interface représentant un utilisateur avec son profil dans l'application
 */
export interface UserWithProfile extends User {
  profile?: Profile;
  role?: string;
}

/**
 * Interface représentant un profil utilisateur dans la base de données
 * Utilise la convention snake_case pour les noms de propriétés
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
  };
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
  };
}

/**
 * Combine un profil utilisateur avec les données d'authentification
 */
export function combineProfileWithAuth(
  profile: Profile,
  authUser: { email: string | null; email_confirmed_at?: string | null },
): ProfileWithAuth {
  return {
    ...profile,
    email: authUser.email,
    isVerified: !!authUser.email_confirmed_at,
  };
}
