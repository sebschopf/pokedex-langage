"use client"

import type React from "react"
import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import type { UserRoleType } from "@/lib/client/permissions"
import { checkUserRole } from "@/utils/security/role-checks"

interface RoleProtectedProps {
  children: ReactNode
  requiredRole: UserRoleType
  redirectTo?: string
  fallback?: ReactNode
}

const RoleProtected: React.FC<RoleProtectedProps> = ({
  children,
  requiredRole,
  redirectTo = "/login",
  fallback = null,
}) => {
  const { user, userRole, isLoading } = useAuth()
  const router = useRouter()

  // Afficher le fallback pendant le chargement
  if (isLoading) {
    return fallback
  }

  // Rediriger si non connecté
  if (!user) {
    router.push(redirectTo)
    return fallback
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (!checkUserRole(userRole, requiredRole)) {
    router.push(redirectTo)
    return fallback
  }

  return <>{children}</>
}

export default RoleProtected

// Export nommé pour permettre l'import par défaut ou nommé
export { RoleProtected }
