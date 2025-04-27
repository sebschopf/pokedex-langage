import { createServerClient } from '@/lib/supabase/server';
import { checkUserRole } from '@/utils/security/role-checks';
import { dbRoleToAppRole } from '@/utils/security/role-conversion';
import type { UserRoleType, UserRoleTypeDB } from '@/utils/security/role-types';

/**
 * Vérifie si l'utilisateur actuel a un rôle spécifique ou supérieur
 * @param requiredRole Rôle requis
 * @returns true si l'utilisateur a le rôle requis ou supérieur, false sinon
 */
export async function hasRole(requiredRole: UserRoleType): Promise<boolean> {
  const supabase = createServerClient();

  // Si le rôle requis est "anonymous", tout utilisateur y a accès
  if (requiredRole === 'anonymous') {
    return true;
  }

  // Récupérer la session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return false;
  }

  // Récupérer le rôle de l'utilisateur
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!userRole) {
    return false;
  }

  // Utiliser la fonction centralisée pour vérifier le rôle
  return checkUserRole(userRole.role as UserRoleTypeDB, requiredRole);
}

/**
 * Récupère le rôle de l'utilisateur actuel
 * @returns Le rôle de l'utilisateur ou "anonymous" si non connecté
 */
export async function getCurrentUserRole(): Promise<UserRoleType> {
  const supabase = createServerClient();

  // Récupérer la session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return 'anonymous';
  }

  // Récupérer le rôle de l'utilisateur
  const { data: userRole } = await supabase
    .from('user_roles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!userRole) {
    return 'anonymous';
  }

  // Convertir le rôle de la base de données en rôle d'application
  return dbRoleToAppRole(userRole.role as UserRoleTypeDB);
}

export * from './authorize';
