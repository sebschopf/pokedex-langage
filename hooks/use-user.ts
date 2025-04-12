"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import type { UserRoleType } from "@/lib/client/permissions"

export function useUser() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)

          // Récupérer le rôle de l'utilisateur
          const { data: userRoleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("id", session.user.id)
            .single()

          if (userRoleData) {
            setUserRole(userRoleData.role as UserRoleType)
          }

          // Récupérer le profil de l'utilisateur
          try {
            const { data: profileData } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

            if (profileData) {
              setProfile(profileData)
            }
          } catch (error) {
            console.log("Erreur lors de la récupération du profil:", error)
          }
        }
      } catch (error) {
        console.log("Erreur lors de la récupération de l'utilisateur:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        getUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setUserRole(null)
        setProfile(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return { user, userRole, profile, loading }
}
