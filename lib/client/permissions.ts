"use client"

import { createBrowserClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "./auth-helpers"

// Type pour les rôles stockés en base de données (correspond exactement à l'enum PostgreSQL)
export type UserRoleTypeDB = "admin" | "validator" | "verified" | "registered"

// Type étendu pour l'application qui inclut "anonymous" pour les utilisateurs non connectés
export type UserRoleType = UserRoleTypeDB | "anonymous"

/**
 * Vérifie si un rôle est valide pour la base de données
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour la base de données
 */
export function isValidDBRole(role: string): role is UserRoleTypeDB {
  return ["admin", "validator", "verified", "registered"].includes(role)
}

/**
 * Vérifie si un rôle est valide pour l'application
 * @param role Rôle à vérifier
 * @returns true si le rôle est valide pour l'application
 */
export function isValidRole(role: string): role is UserRoleType {
  return ["admin", "validator", "verified", "registered", "anonymous"].includes(role)
}

/**
 * Récupère le rôle de l'utilisateur connecté
 * @returns Promise<UserRoleType> Le rôle de l'utilisateur (anonymous si non connecté)
 */
export async function getUserRole(): Promise<UserRoleType> {
  const supabase = createBrowserClient()

  try {
    // Vérifier d'abord si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Si pas de session, l'utilisateur est anonyme
    if (!session) {
      return "anonymous"
    }

    // Utiliser withTokenRefresh pour gérer le rafraîchissement du token si nécessaire
    return await withTokenRefresh(async () => {
      // Utiliser la fonction RPC pour récupérer le rôle
      const { data, error } = await supabase.rpc("get_user_role")

      if (error) {
        console.error("Erreur lors de la récupération du rôle:", error)

        // Fallback: essayer de récupérer directement depuis la table
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (roleError) {
          console.error("Erreur lors de la récupération du rôle depuis la table:", roleError)
          return "registered" // Rôle par défaut pour les utilisateurs connectés
        }

        return (roleData?.role as UserRoleTypeDB) || "registered"
      }

      return data as UserRoleTypeDB
    })
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle:", error)
    return "anonymous"
  }
}

/**
 * Vérifie si l'utilisateur connecté a un rôle spécifique ou supérieur
 * @param requiredRole Rôle requis pour accéder à la fonctionnalité
 * @returns Promise<boolean> Indiquant si l'utilisateur a le rôle requis
 */
export async function hasRole(requiredRole: UserRoleType): Promise<boolean> {
  // Si le rôle requis est "anonymous", tout utilisateur (même non connecté) y a accès
  if (requiredRole === "anonymous") {
    return true
  }

  const userRole = await getUserRole()

  // Si l'utilisateur est anonyme, il n'a accès à aucun rôle autre que "anonymous"
  if (userRole === "anonymous") {
    return false
  }

  // Sinon, vérifier le niveau de rôle
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
    anonymous: 0,
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

/**
 * Obtenir le libellé d'un rôle pour l'affichage
 * @param role Rôle utilisateur
 * @returns Libellé du rôle en français
 */
export function getRoleLabel(role: UserRoleType): string {
  const roleLabels: Record<UserRoleType, string> = {
    admin: "Administrateur",
    validator: "Validateur",
    verified: "Utilisateur vérifié",
    registered: "Utilisateur enregistré",
    anonymous: "Visiteur",
  }

  return roleLabels[role] || "Inconnu"
}

/**
 * Obtenir la couleur associée à un rôle pour l'affichage
 * @param role Rôle utilisateur
 * @returns Classes CSS pour styliser le badge de rôle
 */
export function getRoleColor(role: UserRoleType): string {
  const roleColors: Record<UserRoleType, string> = {
    admin: "bg-red-100 text-red-800 border-red-300",
    validator: "bg-purple-100 text-purple-800 border-purple-300",
    verified: "bg-green-100 text-green-800 border-green-300",
    registered: "bg-blue-100 text-blue-800 border-blue-300",
    anonymous: "bg-gray-100 text-gray-800 border-gray-300",
  }

  return roleColors[role] || "bg-gray-100 text-gray-800 border-gray-300"
}

/**
 * Vérifie si un utilisateur a la permission d'effectuer une action spécifique
 * @param action Action à vérifier
 * @param userRole Rôle de l'utilisateur
 * @returns true si l'utilisateur a la permission, false sinon
 */
export function hasPermission(action: string, userRole: UserRoleType): boolean {
  // Définir les permissions par rôle
  const permissions: Record<UserRoleType, string[]> = {
    admin: [
      // Permissions administrateur
      "manage_users",
      "manage_roles",
      "manage_content",
      "validate_content",
      "create_content",
      "edit_content",
      "delete_content",
      "view_admin_dashboard",
      "view_analytics",
    ],
    validator: [
      // Permissions validateur
      "validate_content",
      "create_content",
      "edit_content",
      "view_analytics",
    ],
    verified: [
      // Permissions utilisateur vérifié
      "create_content",
      "edit_own_content",
    ],
    registered: [
      // Permissions utilisateur enregistré
      "create_proposals",
      "edit_profile",
    ],
    anonymous: [
      // Permissions visiteur
      "view_content",
    ],
  }

  // Vérifier si l'action est dans les permissions du rôle
  if (permissions[userRole].includes(action)) {
    return true
  }

  // Vérifier si l'utilisateur a un rôle supérieur qui inclut cette action
  const roleHierarchy: Record<UserRoleType, number> = {
    admin: 4,
    validator: 3,
    verified: 2,
    registered: 1,
    anonymous: 0,
  }

  // Parcourir les rôles supérieurs pour vérifier si l'action est autorisée
  for (const [role, level] of Object.entries(roleHierarchy) as [UserRoleType, number][]) {
    if (level > roleHierarchy[userRole] && permissions[role as UserRoleType].includes(action)) {
      return false // L'action est réservée à un rôle supérieur
    }
  }

  return false
}

/**
 * Obtenir toutes les permissions disponibles pour un rôle
 * @param role Rôle utilisateur
 * @returns Liste des permissions disponibles pour ce rôle
 */
export function getPermissionsForRole(role: UserRoleType): string[] {
  const allPermissions: Record<UserRoleType, string[]> = {
    admin: [
      "manage_users",
      "manage_roles",
      "manage_content",
      "validate_content",
      "create_content",
      "edit_content",
      "delete_content",
      "view_admin_dashboard",
      "view_analytics",
    ],
    validator: ["validate_content", "create_content", "edit_content", "view_analytics"],
    verified: ["create_content", "edit_own_content"],
    registered: ["create_proposals", "edit_profile"],
    anonymous: ["view_content"],
  }

  // Récupérer les permissions pour le rôle spécifié
  const permissions = [...allPermissions[role]]

  // Ajouter les permissions des rôles inférieurs (héritage)
  const roleHierarchy: UserRoleType[] = ["anonymous", "registered", "verified", "validator", "admin"]
  const roleIndex = roleHierarchy.indexOf(role)

  for (let i = 0; i < roleIndex; i++) {
    const lowerRole = roleHierarchy[i]
    permissions.push(...allPermissions[lowerRole])
  }

  // Éliminer les doublons
  return [...new Set(permissions)]
}

/**
 * Vérifie si un utilisateur peut modifier un contenu
 * @param contentOwnerId ID du propriétaire du contenu
 * @param currentUserId ID de l'utilisateur actuel
 * @param userRole Rôle de l'utilisateur actuel
 * @returns true si l'utilisateur peut modifier le contenu, false sinon
 */
export function canEditContent(contentOwnerId: string, currentUserId: string, userRole: UserRoleType): boolean {
  // Les administrateurs peuvent tout modifier
  if (userRole === "admin") {
    return true
  }

  // Les validateurs peuvent modifier tout le contenu
  if (userRole === "validator") {
    return true
  }

  // Les utilisateurs vérifiés peuvent modifier leur propre contenu
  if (userRole === "verified" && contentOwnerId === currentUserId) {
    return true
  }

  // Tous les autres cas ne sont pas autorisés
  return false
}
