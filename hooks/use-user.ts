"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/client/supabase"
import type { User } from "@/types/models/profile"
import type { UserRoleType } from "@/lib/client/permissions"
import { dbUserToUser } from "@/lib/server/mapping/profile-mapping" // Correction de l'importation

/**
 * Hook pour récupérer les données de l'utilisateur connecté
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true)

        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setUser(null)
          setUserRole(null)
          return
        }

        // Récupérer les données complètes de l'utilisateur
        // Utiliser la méthode auth.admin.getUserById au lieu de from("users")
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(session.user.id)

        if (userError) {
          throw new Error(userError.message)
        }

        if (userData) {
          // Convertir les données de la base de données en format d'application
          const appUser = dbUserToUser({
            id: userData.user.id,
            email: userData.user.email || null, // Conversion de undefined en null
            created_at: userData.user.created_at,
            updated_at: userData.user.updated_at || null // Conversion de undefined en null
          })
          setUser(appUser)
        } else {
          // Fallback avec les données minimales
          setUser({
            id: session.user.id,
            email: session.user.email || null, // Conversion de undefined en null
            createdAt: new Date(session.user.created_at).toISOString(),
            updatedAt: null,
          })
        }

        // Récupérer le rôle de l'utilisateur
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (roleError && roleError.code !== "PGRST116") {
          // PGRST116 = "No rows returned" - c'est normal si l'utilisateur n'a pas encore de rôle
          console.error("Erreur lors de la récupération du rôle:", roleError)
        }

        // Utiliser le rôle récupéré ou "registered" par défaut
        setUserRole((roleData?.role as UserRoleType) || "registered")
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [supabase])

  return { user, userRole, isLoading, error }
}