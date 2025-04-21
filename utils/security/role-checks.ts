/**
 * Fonctions de vérification des rôles
 */
import type { UserRoleType } from "./role-types"
import { ROLE_HIERARCHY } from "./role-types"

/**
 * Vérifie si un utilisateur a un rôle spécifique ou supérieur
 * @param userRole Rôle de l'utilisateur
 * @param requiredRole Rôle requis
 * @returns true si l'utilisateur a le rôle requis ou supérieur, false sinon
 */
export function checkUserRole(userRole: UserRoleType | null | undefined, requiredRole: UserRoleType): boolean {
  if (!userRole) return requiredRole === "anonymous"
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole]
}

/**
 * Vérifie si un utilisateur est administrateur
 * @param userRole Rôle de l'utilisateur
 * @returns true si l'utilisateur est administrateur
 */
export function isAdmin(userRole: UserRoleType | null | undefined): boolean {
  return checkUserRole(userRole, "admin")
}

/**
 * Vérifie si un utilisateur est validateur ou plus
 * @param userRole Rôle de l'utilisateur
 * @returns true si l'utilisateur est validateur ou administrateur
 */
export function isValidator(userRole: UserRoleType | null | undefined): boolean {
  return checkUserRole(userRole, "validator")
}

/**
 * Vérifie si un utilisateur est vérifié ou plus
 * @param userRole Rôle de l'utilisateur
 * @returns true si l'utilisateur est vérifié, validateur ou administrateur
 */
export function isVerified(userRole: UserRoleType | null | undefined): boolean {
  return checkUserRole(userRole, "verified")
}

/**
 * Vérifie si un utilisateur est enregistré ou plus
 * @param userRole Rôle de l'utilisateur
 * @returns true si l'utilisateur est au moins enregistré
 */
export function isRegistered(userRole: UserRoleType | null | undefined): boolean {
  return checkUserRole(userRole, "registered")
}
