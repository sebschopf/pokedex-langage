"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import type { ReactNode } from "react"
import type { Session, User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    // Fonction pour récupérer la session
    async function getSession() {
      try {
        setIsLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setSession(session)
          setUser(session.user)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Récupérer la session au chargement
    getSession()

    // Configurer l'écouteur d'événements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Nettoyer l'écouteur
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <AuthContext.Provider value={{ user, session, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
