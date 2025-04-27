import type { UserRoleType } from '@/types/models/user-role';

// Vérifier si un utilisateur a un rôle spécifique
export function hasRole(
  userRole: UserRoleType | null | undefined,
  requiredRole: UserRoleType,
): boolean {
  if (!userRole) return false;

  // Définir la hiérarchie des rôles
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 100,
    validator: 50,
    verified: 20,
    registered: 10,
    anonymous: 0,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Vérifier si un utilisateur est administrateur
export function isAdmin(userRole: UserRoleType | null | undefined): boolean {
  return hasRole(userRole, 'admin');
}

// Vérifier si un utilisateur est modérateur ou plus
export function isModerator(userRole: UserRoleType | null | undefined): boolean {
  return hasRole(userRole, 'validator');
}

// Vérifier si un utilisateur est contributeur ou plus
export function isContributor(userRole: UserRoleType | null | undefined): boolean {
  return hasRole(userRole, 'verified');
}
