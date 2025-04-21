/**
 * Fonctions de conversion entre types de rôles
 */
import type { UserRoleType, UserRoleTypeDB } from "./role-types"

/**
 * Convertit un rôle de base de données en rôle d'application
 * @param dbRole Rôle de base de données
 * @returns Rôle d'application
 */
export function dbRoleToAppRole(dbRole: UserRoleTypeDB | null | undefined): UserRoleType {
  if (!dbRole) return "anonymous"
  return dbRole // Comme UserRoleTypeDB est un sous-ensemble de UserRoleType, cette conversion est sûre
}

/**
 * Convertit un rôle d'application en rôle de base de données
 * @param appRole Rôle d'application
 * @returns Rôle de base de données ou null si le rôle est "anonymous"
 */
export function appRoleToDbRole(appRole: UserRoleType): UserRoleTypeDB | null {
  if (appRole === "anonymous") return null
  return appRole as UserRoleTypeDB
}
