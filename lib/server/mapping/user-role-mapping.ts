import type { DbUserRole } from '@/types/database/user-role';
import type { UserRole } from '@/types/models/user-role';

/**
 * Convertit un objet DbUserRole en UserRole
 * @param dbUserRole Objet de la base de données
 * @returns Objet UserRole pour l'application
 */
export function dbToUserRole(dbUserRole: DbUserRole): UserRole {
  return {
    id: dbUserRole.id,
    role: dbUserRole.role,
    createdAt: dbUserRole.created_at,
    updatedAt: dbUserRole.updated_at,
  };
}

/**
 * Convertit un objet UserRole en DbUserRole
 * @param userRole Objet de l'application
 * @returns Objet pour la base de données
 */
export function userRoleToDb(userRole: Partial<UserRole>): Partial<DbUserRole> {
  const dbUserRole: Partial<DbUserRole> = {};

  if (userRole.id !== undefined) dbUserRole.id = userRole.id;
  if (userRole.role !== undefined) dbUserRole.role = userRole.role;
  if (userRole.createdAt !== undefined) dbUserRole.created_at = userRole.createdAt;
  if (userRole.updatedAt !== undefined) dbUserRole.updated_at = userRole.updatedAt;

  return dbUserRole;
}
