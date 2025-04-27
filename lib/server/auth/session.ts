import { createServerClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/server/api/users';
import type { UserRoleType } from '@/types/models/user-role';

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns La session si l'utilisateur est authentifié, null sinon
 */
export async function getSession() {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/**
 * Vérifie si l'utilisateur est authentifié et renvoie une erreur si ce n'est pas le cas
 * @returns La session si l'utilisateur est authentifié
 * @throws Error si l'utilisateur n'est pas authentifié
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error('Non authentifié');
  }

  return session;
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique ou supérieur
 * @param requiredRole Rôle requis
 * @returns La session si l'utilisateur a le rôle requis
 * @throws Error si l'utilisateur n'a pas le rôle requis
 */
export async function requireRole(requiredRole: UserRoleType) {
  const session = await requireAuth();

  // Récupérer le rôle de l'utilisateur
  const userRole = await getUserRole(session.user.id);

  if (!userRole) {
    throw new Error('Rôle non trouvé');
  }

  // Définir la hiérarchie des rôles
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
    anonymous: 0,
  };

  // Vérifier que userRole est une clé valide de roleHierarchy
  const validRoles: UserRoleType[] = ['admin', 'validator', 'verified', 'registered', 'anonymous'];
  if (!validRoles.includes(userRole as UserRoleType)) {
    throw new Error(`Rôle invalide: ${userRole}`);
  }

  // Vérifier si l'utilisateur a le rôle requis ou supérieur
  if (roleHierarchy[userRole as UserRoleType] < roleHierarchy[requiredRole]) {
    throw new Error('Accès non autorisé');
  }

  return session;
}

/**
 * Vérifie si l'utilisateur est administrateur
 * @returns La session si l'utilisateur est administrateur
 * @throws Error si l'utilisateur n'est pas administrateur
 */
export async function requireAdmin() {
  return requireRole('admin');
}

/**
 * Vérifie si l'utilisateur est validateur ou administrateur
 * @returns La session si l'utilisateur est validateur ou administrateur
 * @throws Error si l'utilisateur n'est pas validateur ou administrateur
 */
export async function requireValidator() {
  return requireRole('validator');
}
