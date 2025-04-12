"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { hasRole } from "@/lib/client/permissions"
import type { UserRoleType } from "@/lib/client/permissions"
import { createClientSupabaseClient } from "@/lib/client/supabase"

interface RoleProtectedProps {
  requiredRole: UserRoleType
  children: React.ReactNode
  fallback?: React.ReactNode
}

const RoleProtected: React.FC<RoleProtectedProps> = ({ requiredRole, children, fallback }) => {
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        setIsLoading(true)
        const supabase = createClientSupabaseClient()

        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setHasRequiredRole(false)
          return
        }

        // Vérifier le rôle de l'utilisateur
        const { data: userRoleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (!userRoleData) {
          setHasRequiredRole(false)
          return
        }

        // Vérifier si l'utilisateur a le rôle requis
        const userHasRole = await hasRole(requiredRole)
        setHasRequiredRole(userHasRole)
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle:", error)
        setHasRequiredRole(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserRole()
  }, [requiredRole])

  if (isLoading) {
    return null // Ou un composant de chargement
  }

  if (!hasRequiredRole) {
    return fallback || null
  }

  return <>{children}</>
}

export default RoleProtected
