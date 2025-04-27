/**
 * Fonctions de validation des rôles
 */
import type { UserRoleType, UserRoleTypeDB } from './role-types';

/**
 * Vérifie si un rôle est valide pour la base de données
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour la base de données
 */
export function isValidDbRole(role: string): role is UserRoleTypeDB {
  return ['admin', 'validator', 'verified', 'registered'].includes(role);
}

/**
 * Vérifie si un rôle est valide pour l'application
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour l'application
 */
export function isValidAppRole(role: string): role is UserRoleType {
  return ['admin', 'validator', 'verified', 'registered', 'anonymous'].includes(role);
}
