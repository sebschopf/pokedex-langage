// utils/security/role-utils.ts
import type { UserRoleType, UserRoleTypeDB } from "@/lib/client/permissions"

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

/**
 * Vérifie si un rôle est valide pour la base de données
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour la base de données
 */
export function isValidDbRole(role: string): role is UserRoleTypeDB {
  return ["admin", "validator", "verified", "registered"].includes(role)
}

/**
 * Vérifie si un rôle est valide pour l'application
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour l'application
 */
export function isValidAppRole(role: string): role is UserRoleType {
  return ["admin", "validator", "verified", "registered", "anonymous"].includes(role)
}