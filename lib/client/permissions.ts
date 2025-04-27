'use client';

import { createBrowserClient } from '@/lib/client/supabase';
import { withTokenRefresh } from './auth-helpers';
import {
  checkUserRole,
  isAdmin,
  isValidator,
  isVerified,
  isRegistered,
} from '@/utils/security/role-checks';
import { isValidDbRole, isValidAppRole as isValidRole } from '@/utils/security/role-validation';
import type { UserRoleType, UserRoleTypeDB } from '@/utils/security/role-types';

// Réexporter les types pour la compatibilité
export type { UserRoleType, UserRoleTypeDB };

// Réexporter les fonctions de validation pour la compatibilité
export { isValidDbRole, isValidRole };

/**
 * Récupère le rôle de l'utilisateur connecté
 * @returns Promise<UserRoleType> Le rôle de l'utilisateur (anonymous si non connecté)
 */
export async function getUserRole(): Promise<UserRoleType> {
  const supabase = createBrowserClient();

  try {
    // Vérifier d'abord si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Si pas de session, l'utilisateur est anonyme
    if (!session) {
      return 'anonymous';
    }

    // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token si nécessaire
    return await withTokenRefresh(async () => {
      // Utiliser la fonction RPC pour récupérer le rôle
      const { data, error } = await supabase.rpc('get_user_role');

      if (error) {
        console.error('Erreur lors de la récupération du rôle:', error);

        // Fallback: essayer de récupérer directement depuis la table
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (roleError) {
          console.error('Erreur lors de la récupération du rôle depuis la table:', roleError);
          return 'registered'; // Rôle par défaut pour les utilisateurs connectés
        }

        return (roleData?.role as UserRoleTypeDB) || 'registered';
      }

      return data as UserRoleTypeDB;
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error);
    return 'anonymous';
  }
}

/**
 * Vérifie si l'utilisateur connecté a un rôle spécifique ou supérieur
 * @param requiredRole Rôle requis pour accéder à la fonctionnalité
 * @returns Promise<boolean> Indiquant si l'utilisateur a le rôle requis
 */
export async function hasRole(requiredRole: UserRoleType): Promise<boolean> {
  const userRole = await getUserRole();
  return checkUserRole(userRole, requiredRole);
}

// Réexporter les fonctions utilitaires pour faciliter l'accès
export { checkUserRole, isAdmin, isValidator, isVerified, isRegistered };

/**
 * Obtenir le libellé d'un rôle pour l'affichage
 * @param role Rôle utilisateur
 * @returns Libellé du rôle en français
 */
export function getRoleLabel(role: UserRoleType): string {
  const roleLabels: Record<UserRoleType, string> = {
    admin: 'Administrateur',
    validator: 'Validateur',
    verified: 'Utilisateur vérifié',
    registered: 'Utilisateur enregistré',
    anonymous: 'Visiteur',
  };

  return roleLabels[role] || 'Inconnu';
}

/**
 * Obtenir la couleur associée à un rôle pour l'affichage
 * @param role Rôle utilisateur
 * @returns Classes CSS pour styliser le badge de rôle
 */
export function getRoleColor(role: UserRoleType): string {
  const roleColors: Record<UserRoleType, string> = {
    admin: 'bg-red-100 text-red-800 border-red-300',
    validator: 'bg-purple-100 text-purple-800 border-purple-300',
    verified: 'bg-green-100 text-green-800 border-green-300',
    registered: 'bg-blue-100 text-blue-800 border-blue-300',
    anonymous: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return roleColors[role] || 'bg-gray-100 text-gray-800 border-gray-300';
}
