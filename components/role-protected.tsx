"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/client/supabase"

// Exporter l'interface des props
export interface RoleProtectedProps {
  children: React.ReactNode
  roles: string[]
}

export default function RoleProtected({ children, roles }: RoleProtectedProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function checkUserRole() {
      try {
        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setIsAuthorized(false)
          router.push("/login?redirectTo=" + encodeURIComponent(window.location.pathname))
          return
        }

        // Récupérer le rôle de l'utilisateur
        const { data: userRole, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .single()

        if (error || !userRole) {
          console.error("Erreur lors de la récupération du rôle:", error)
          setIsAuthorized(false)
          router.push("/")
          return
        }

        // Vérifier si le rôle de l'utilisateur est autorisé
        const hasAccess = roles.includes(userRole.role)
        setIsAuthorized(hasAccess)

        if (!hasAccess) {
          router.push("/")
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle:", error)
        setIsAuthorized(false)
        router.push("/")
      }
    }

    checkUserRole()
  }, [router, roles, supabase])

  // Afficher un message de chargement pendant la vérification
  if (isAuthorized === null) {
    return <div className="container mx-auto py-8 text-center">Vérification des autorisations...</div>
  }

  // Si l'utilisateur n'est pas autorisé, ne rien afficher (la redirection est gérée dans useEffect)
  if (!isAuthorized) {
    return null
  }

  // Si l'utilisateur est autorisé, afficher le contenu
  return <>{children}</>
}
