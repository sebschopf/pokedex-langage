"use client"

import { useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@/lib/client/supabase"
import type { UserRoleType } from "@/types/models/user-role"
import type { Profile } from "@/types/models/profile"
import type { User } from "@supabase/supabase-js"

export interface UserData {
  user: User | null
  userRole: UserRoleType | null
  profile: Profile | null
  isLoading: boolean
  error: Error | null
  refreshUserData: () => Promise<void>
}

/**
 * Hook personnalisé pour accéder aux données utilisateur
 * Fournit l'utilisateur, son rôle, son profil et des fonctions utilitaires
 */
export function useUser(): UserData {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createBrowserClient()

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Récupérer la session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        throw new Error(`Erreur lors de la récupération de la session: ${sessionError.message}`)
      }

      const session = sessionData.session

      if (!session) {
        // Pas de session, réinitialiser les états
        setUser(null)
        setUserRole(null)
        setProfile(null)
        return
      }

      // Définir l'utilisateur
      setUser(session.user)

      // Récupérer le rôle et le profil en une seule requête si possible
      // Si votre base de données le permet, vous pourriez utiliser une procédure stockée ou une vue
      // Pour cet exemple, nous utilisons deux requêtes séparées mais optimisées

      // Récupérer le rôle
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single()

      if (roleError && roleError.code !== "PGRST116") {
        // PGRST116 = "No rows returned" - c'est normal si l'utilisateur n'a pas encore de rôle
        console.error("Erreur lors de la récupération du rôle:", roleError)
      }

      setUserRole((roleData?.role as UserRoleType) || "registered")

      // Récupérer le profil
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Erreur lors de la récupération du profil:", profileError)
      }

      if (profileData) {
        setProfile(profileData as unknown as Profile)
      }
    } catch (err) {
      console.error("Erreur dans useUser:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  // Fonction pour rafraîchir manuellement les données utilisateur
  const refreshUserData = useCallback(async () => {
    await fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    // Charger les données utilisateur au montage
    fetchUserData()

    // S'abonner aux changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await fetchUserData()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setUserRole(null)
        setProfile(null)
      }
    })

    // Nettoyer l'abonnement
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase, fetchUserData])

  return {
    user,
    userRole,
    profile,
    isLoading,
    error,
    refreshUserData,
  }
}
