import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { getUserRole } from '@/lib/server/api/users';
import type { UserRoleType } from '@/lib/client/permissions';

/**
 * Vérifie si l'utilisateur est authentifié dans un Server Component
 * Redirige vers la page de connexion si ce n'est pas le cas
 * @param redirectTo URL de redirection après connexion (par défaut: URL actuelle)
 * @returns ID de l'utilisateur si authentifié
 */
export async function requireAuthSC(redirectTo?: string): Promise<string> {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = redirectTo
      ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
      : '/login';
    redirect(redirectUrl);
  }

  return session.user.id;
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique dans un Server Component
 * Redirige vers la page non autorisée si ce n'est pas le cas
 * @param requiredRole Rôle requis
 * @param redirectTo URL de redirection si non autorisé (par défaut: /unauthorized)
 * @returns ID de l'utilisateur si autorisé
 */
export async function requireRoleSC(
  requiredRole: UserRoleType,
  redirectTo = '/unauthorized',
): Promise<string> {
  const userId = await requireAuthSC();

  // Récupérer le rôle de l'utilisateur
  const userRole = await getUserRole(userId);

  if (!userRole) {
    redirect(redirectTo);
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
    redirect(redirectTo);
  }

  // Vérifier si l'utilisateur a le rôle requis ou supérieur
  if (roleHierarchy[userRole as UserRoleType] < roleHierarchy[requiredRole]) {
    redirect(redirectTo);
  }

  return userId;
}

/**
 * Vérifie si l'utilisateur est administrateur dans un Server Component
 * @param redirectTo URL de redirection si non autorisé (par défaut: /unauthorized)
 * @returns ID de l'utilisateur si administrateur
 */
export async function requireAdminSC(redirectTo = '/unauthorized'): Promise<string> {
  return requireRoleSC('admin', redirectTo);
}

/**
 * Vérifie si l'utilisateur est validateur dans un Server Component
 * @param redirectTo URL de redirection si non autorisé (par défaut: /unauthorized)
 * @returns ID de l'utilisateur si validateur ou administrateur
 */
export async function requireValidatorSC(redirectTo = '/unauthorized'): Promise<string> {
  return requireRoleSC('validator', redirectTo);
}

/**
 * Vérifie si l'utilisateur est vérifié dans un Server Component
 * @param redirectTo URL de redirection si non autorisé (par défaut: /unauthorized)
 * @returns ID de l'utilisateur si vérifié, validateur ou administrateur
 */
export async function requireVerifiedSC(redirectTo = '/unauthorized'): Promise<string> {
  return requireRoleSC('verified', redirectTo);
}
