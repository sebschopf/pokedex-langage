"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { hasRole } from "@/lib/client/permissions"
import type { UserRoleType } from "@/lib/client/permissions"
import { Loader2 } from "lucide-react"

interface RoleProtectedProps {
  children: React.ReactNode
  requiredRole: UserRoleType
  fallback?: React.ReactNode
  redirectTo?: string
  showLoading?: boolean
}

/**
 * Composant qui protège son contenu en fonction du rôle de l'utilisateur
 * @param children Contenu à protéger
 * @param requiredRole Rôle requis pour accéder au contenu
 * @param fallback Contenu à afficher si l'utilisateur n'a pas le rôle requis (optionnel)
 * @param redirectTo URL vers laquelle rediriger si l'utilisateur n'a pas le rôle requis (optionnel)
 * @param showLoading Afficher un indicateur de chargement pendant la vérification (par défaut: true)
 */
export function RoleProtected({
  children,
  requiredRole,
  fallback,
  redirectTo,
  showLoading = true,
}: RoleProtectedProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { user, userRole, isLoading } = useAuth()

  useEffect(() => {
    async function checkAccess() {
      // Si les données utilisateur sont en cours de chargement, attendre
      if (isLoading) return

      // Si l'utilisateur n'est pas connecté et qu'un rôle autre que "anonymous" est requis
      if (!user && requiredRole !== "anonymous") {
        setIsAuthorized(false)
        if (redirectTo) {
          router.push(`/login?redirectTo=${encodeURIComponent(redirectTo || pathname)}`)
        }
        return
      }

      // Si nous avons déjà le rôle de l'utilisateur depuis useAuth
      if (userRole) {
        const roleHierarchy: Record<UserRoleType, number> = {
          admin: 4,
          validator: 3,
          verified: 2,
          registered: 1,
          anonymous: 0,
        }

        const hasAccess = roleHierarchy[userRole] >= roleHierarchy[requiredRole]
        setIsAuthorized(hasAccess)

        if (!hasAccess && redirectTo) {
          router.push(redirectTo)
        }
        return
      }

      // Sinon, vérifier le rôle avec la fonction hasRole
      try {
        const authorized = await hasRole(requiredRole)
        setIsAuthorized(authorized)

        if (!authorized && redirectTo) {
          router.push(redirectTo)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle:", error)
        setIsAuthorized(false)
        if (redirectTo) {
          router.push(redirectTo)
        }
      }
    }

    checkAccess()
  }, [user, userRole, isLoading, requiredRole, redirectTo, router, pathname])

  // Afficher un indicateur de chargement pendant la vérification
  if ((isLoading || isAuthorized === null) && showLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Vérification des autorisations...</span>
      </div>
    )
  }

  // Si l'utilisateur n'est pas autorisé et qu'un fallback est fourni, l'afficher
  if (!isAuthorized && fallback) {
    return <>{fallback}</>
  }

  // Si l'utilisateur n'est pas autorisé et qu'aucun fallback n'est fourni, ne rien afficher
  if (!isAuthorized) {
    return null
  }

  // Si l'utilisateur est autorisé, afficher le contenu
  return <>{children}</>
}
