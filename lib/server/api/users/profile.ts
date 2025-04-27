import { createServerClient } from '@/lib/supabase/server';
import type { DbProfile, Profile } from '@/types/models/profile';
import { dbProfileToProfile } from '@/types/models/profile';
import type { WithRequired } from '@/types/utils';

/**
 * Récupère le profil d'un utilisateur à partir de son ID
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @returns Une promesse qui résout vers le profil de l'utilisateur ou null si non trouvé
 * @throws {Error} Si une erreur survient lors de la récupération du profil
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Code d'erreur pour "No rows found"
      return null;
    }
    console.error(`Erreur lors de la récupération du profil de l'utilisateur ${userId}:`, error);
    throw error;
  }

  // Convertir le profil de la base de données en profil pour l'application
  return dbProfileToProfile(data as DbProfile);
}

/**
 * Met à jour le profil d'un utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param profile - Les données du profil à mettre à jour (partiel)
 * @returns Une promesse qui résout vers le profil mis à jour
 * @throws {Error} Si une erreur survient lors de la mise à jour du profil
 */
export async function updateUserProfile(
  userId: string,
  profile: Partial<Profile>,
): Promise<Profile> {
  const supabase = createServerClient();

  // Convertir le profil partiel de l'application en profil partiel pour la base de données
  const dbProfile: Partial<DbProfile> = {};

  if (profile.username !== undefined) dbProfile.username = profile.username;
  if (profile.fullName !== undefined) dbProfile.full_name = profile.fullName;
  if (profile.avatarUrl !== undefined) dbProfile.avatar_url = profile.avatarUrl;
  if (profile.bio !== undefined) dbProfile.bio = profile.bio;
  if (profile.website !== undefined) dbProfile.website = profile.website;

  const { data, error } = await supabase
    .from('profiles')
    .update(dbProfile)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error(`Erreur lors de la mise à jour du profil de l'utilisateur ${userId}:`, error);
    throw error;
  }

  // Convertir le profil de la base de données en profil pour l'application
  return dbProfileToProfile(data as DbProfile);
}

/**
 * Crée un nouveau profil utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param profile - Les données du profil à créer
 * @returns Une promesse qui résout vers le profil créé
 * @throws {Error} Si une erreur survient lors de la création du profil
 */
export async function createUserProfile(
  userId: string,
  profile: Partial<Profile>,
): Promise<Profile> {
  const supabase = createServerClient();

  // Convertir le profil partiel de l'application en profil partiel pour la base de données
  // avec l'ID comme propriété obligatoire
  const dbProfile: WithRequired<Partial<DbProfile>, 'id'> = {
    id: userId, // Utiliser l'ID utilisateur comme ID de profil
  };

  if (profile.username !== undefined) dbProfile.username = profile.username;
  if (profile.fullName !== undefined) dbProfile.full_name = profile.fullName;
  if (profile.avatarUrl !== undefined) dbProfile.avatar_url = profile.avatarUrl;
  if (profile.bio !== undefined) dbProfile.bio = profile.bio;
  if (profile.website !== undefined) dbProfile.website = profile.website;

  const { data, error } = await supabase.from('profiles').insert(dbProfile).select().single();

  if (error) {
    console.error(`Erreur lors de la création du profil de l'utilisateur ${userId}:`, error);
    throw error;
  }

  // Convertir le profil de la base de données en profil pour l'application
  return dbProfileToProfile(data as DbProfile);
}

/**
 * Supprime le profil d'un utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @returns Une promesse qui résout vers true si la suppression a réussi
 * @throws {Error} Si une erreur survient lors de la suppression du profil
 */
export async function deleteUserProfile(userId: string): Promise<boolean> {
  const supabase = createServerClient();
  const { error } = await supabase.from('profiles').delete().eq('id', userId);

  if (error) {
    console.error(`Erreur lors de la suppression du profil de l'utilisateur ${userId}:`, error);
    throw error;
  }

  return true;
}
