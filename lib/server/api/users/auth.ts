import { createServerClient } from '@/lib/supabase/server';
import type { ProfileWithAuth } from '@/types/models/profile';
import { updateUserProfile } from './profile';

/**
 * Met à jour les informations d'authentification d'un utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param authInfo - Les informations d'authentification à mettre à jour
 * @throws {Error} Si une erreur survient lors de la mise à jour des informations d'authentification
 */
export async function updateUserAuth(
  userId: string,
  authInfo: { email?: string | null; isVerified?: boolean | null },
): Promise<void> {
  const supabase = createServerClient();

  // Mise à jour de l'email via l'API d'administration Supabase Auth
  if (authInfo.email !== undefined && authInfo.email !== null) {
    const { error } = await supabase.auth.admin.updateUserById(userId, { email: authInfo.email });

    if (error) {
      console.error(`Erreur lors de la mise à jour de l'email de l'utilisateur ${userId}:`, error);
      throw error;
    }
  }

  // La vérification d'email est généralement gérée par Supabase Auth
  // et ne peut pas être modifiée manuellement de cette façon
  // Si vous avez besoin de marquer un email comme vérifié, vous devriez
  // utiliser d'autres méthodes de l'API Supabase Auth
}

/**
 * Met à jour le profil complet d'un utilisateur, incluant les informations d'authentification
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @param profileData - Les données du profil et d'authentification à mettre à jour
 * @returns Une promesse qui résout vers le profil mis à jour avec les informations d'authentification
 * @throws {Error} Si une erreur survient lors de la mise à jour
 */
export async function updateUserProfileWithAuth(
  userId: string,
  profileData: Partial<ProfileWithAuth>,
): Promise<ProfileWithAuth> {
  // Séparer les données de profil et d'authentification
  const { email, isVerified, ...profileOnly } = profileData;

  // Mettre à jour le profil
  const updatedProfile = await updateUserProfile(userId, profileOnly);

  // Mettre à jour les informations d'authentification si nécessaire
  if (email !== undefined || isVerified !== undefined) {
    // Créer un objet avec le type exact attendu par updateUserAuth
    const authUpdateData: { email?: string | null; isVerified?: boolean | null } = {};

    // Ajouter email seulement s'il est défini
    if (email !== undefined) {
      authUpdateData.email = email;
    }

    // Ajouter isVerified seulement s'il est défini
    if (isVerified !== undefined) {
      authUpdateData.isVerified = isVerified;
    }

    await updateUserAuth(userId, authUpdateData);
  }

  // Récupérer les informations d'authentification à jour
  const supabase = createServerClient();
  const { data: authData } = await supabase.auth.admin.getUserById(userId);

  // Combiner le profil mis à jour avec les informations d'authentification
  return {
    ...updatedProfile,
    email: authData?.user?.email || null,
    isVerified: !!authData?.user?.email_confirmed_at,
  };
}

/**
 * Récupère les informations d'authentification d'un utilisateur
 *
 * @param userId - L'identifiant unique de l'utilisateur
 * @returns Une promesse qui résout vers les informations d'authentification
 * @throws {Error} Si une erreur survient lors de la récupération des informations
 */
export async function getUserAuthInfo(
  userId: string,
): Promise<{ email: string | null; isVerified: boolean }> {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    console.error(
      `Erreur lors de la récupération des informations d'authentification de l'utilisateur ${userId}:`,
      error,
    );
    throw error;
  }

  return {
    email: data?.user?.email || null,
    isVerified: !!data?.user?.email_confirmed_at,
  };
}
