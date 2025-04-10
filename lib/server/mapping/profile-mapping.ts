import type { DbProfile } from "@/types/database"
import type { Profile } from "@/types/models"

/**
 * Convertit un objet DbProfile en Profile
 * @param dbProfile Objet de la base de données
 * @returns Objet Profile pour l'application
 */
export function dbToProfile(dbProfile: DbProfile): Profile {
  return {
    id: dbProfile.id,
    avatarUrl: dbProfile.avatar_url,
    bio: dbProfile.bio,
    createdAt: dbProfile.created_at,
    fullName: dbProfile.full_name,
    updatedAt: dbProfile.updated_at,
    username: dbProfile.username,
    website: dbProfile.website,
  }
}

/**
 * Convertit un objet Profile en DbProfile
 * @param profile Objet de l'application
 * @returns Objet pour la base de données
 */
export function profileToDb(profile: Partial<Profile>): Partial<DbProfile> {
  const dbProfile: Partial<DbProfile> = {}

  if (profile.id !== undefined) dbProfile.id = profile.id
  if (profile.avatarUrl !== undefined) dbProfile.avatar_url = profile.avatarUrl
  if (profile.bio !== undefined) dbProfile.bio = profile.bio
  if (profile.createdAt !== undefined) dbProfile.created_at = profile.createdAt
  if (profile.fullName !== undefined) dbProfile.full_name = profile.fullName
  if (profile.updatedAt !== undefined) dbProfile.updated_at = profile.updatedAt
  if (profile.username !== undefined) dbProfile.username = profile.username
  if (profile.website !== undefined) dbProfile.website = profile.website

  return dbProfile
}
