import type { DbProfile, DbUser, DbUserWithProfile } from '@/types/database/profile';
import type { Profile, ProfileWithAuth, User, UserWithProfile } from '@/types/models/profile';

/**
 * Convertit un profil de la base de données (snake_case) en profil pour l'application (camelCase)
 * @param dbProfile Profil de la base de données
 * @returns Profil pour l'application
 */
export function dbProfileToProfile(dbProfile: DbProfile): Profile {
  return {
    id: dbProfile.id,
    username: dbProfile.username,
    createdAt: dbProfile.created_at,
    updatedAt: dbProfile.updated_at,
    avatarUrl: dbProfile.avatar_url,
    fullName: dbProfile.full_name,
    bio: dbProfile.bio,
    website: dbProfile.website,
  };
}

/**
 * Convertit un profil de l'application (camelCase) en profil pour la base de données (snake_case)
 * @param profile Profil pour l'application
 * @returns Profil pour la base de données
 */
export function profileToDbProfile(profile: Profile): DbProfile {
  return {
    id: profile.id,
    username: profile.username,
    created_at: profile.createdAt,
    updated_at: profile.updatedAt,
    avatar_url: profile.avatarUrl,
    full_name: profile.fullName,
    bio: profile.bio,
    website: profile.website,
  };
}

/**
 * Convertit un utilisateur de la base de données (snake_case) en utilisateur pour l'application (camelCase)
 * @param dbUser Utilisateur de la base de données
 * @returns Utilisateur pour l'application
 */
export function dbUserToUser(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    email: dbUser.email,
    createdAt: dbUser.created_at,
    updatedAt: dbUser.updated_at,
  };
}

/**
 * Convertit un utilisateur de l'application (camelCase) en utilisateur pour la base de données (snake_case)
 * @param user Utilisateur pour l'application
 * @returns Utilisateur pour la base de données
 */
export function userToDbUser(user: User): DbUser {
  return {
    id: user.id,
    email: user.email,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}

/**
 * Convertit un utilisateur avec profil de la base de données en utilisateur avec profil pour l'application
 * @param dbUserWithProfile Utilisateur avec profil de la base de données
 * @returns Utilisateur avec profil pour l'application
 */
export function dbUserWithProfileToUserWithProfile(
  dbUserWithProfile: DbUserWithProfile,
): UserWithProfile {
  const user = dbUserToUser(dbUserWithProfile);

  return {
    ...user,
    profile: dbUserWithProfile.profile ? dbProfileToProfile(dbUserWithProfile.profile) : undefined,
    role: dbUserWithProfile.role,
  };
}

/**
 * Convertit un utilisateur avec profil de l'application en utilisateur avec profil pour la base de données
 * @param userWithProfile Utilisateur avec profil pour l'application
 * @returns Utilisateur avec profil pour la base de données
 */
export function userWithProfileToDbUserWithProfile(
  userWithProfile: UserWithProfile,
): DbUserWithProfile {
  const dbUser = userToDbUser(userWithProfile);

  return {
    ...dbUser,
    profile: userWithProfile.profile ? profileToDbProfile(userWithProfile.profile) : undefined,
    role: userWithProfile.role,
  };
}

/**
 * Crée un ProfileWithAuth en combinant un profil et les données d'authentification
 * @param profile Profil utilisateur
 * @param authData Données d'authentification de Supabase
 * @returns Profil avec informations d'authentification
 */
export function createProfileWithAuth(
  profile: Profile,
  authData: { email: string | null; email_confirmed_at?: string | null },
): ProfileWithAuth {
  return {
    ...profile,
    email: authData.email,
    isVerified: !!authData.email_confirmed_at,
  };
}
