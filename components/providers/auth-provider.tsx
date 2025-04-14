'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClientSupabaseClient } from '@/lib/client/supabase'
import type { Session, User } from '@supabase/supabase-js'
import type { UserRoleType } from '@/lib/client/permissions'
import { useToast } from '@/components/ui/use-toast'
import { withTokenRefresh } from '@/lib/client/auth-helpers'

// Définir le type pour le contexte d'authentification
type AuthContextType = {
  session: Session | null
  user: User | null
  userRole: UserRoleType | null
  avatarUrl: string | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
}

// Créer le contexte avec une valeur par défaut undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  // Fonction pour récupérer les données utilisateur supplémentaires
  const getUserData = async (userId: string) => {
    try {
      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        // Récupérer le rôle de l'utilisateur
        const { data: userRoleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('id', userId)
          .single()

        if (roleError) {
          // Ignorer l'erreur "No rows returned" (PGRST116)
          if (roleError.code !== 'PGRST116') {
            console.error('Erreur lors de la récupération du rôle:', roleError)
          } else {
            // Si aucun rôle n'est trouvé, définir le rôle par défaut à "registered"
            console.log('Aucun rôle trouvé pour l\'utilisateur, utilisation du rôle par défaut "registered"')
            setUserRole('registered')
            
            // Créer automatiquement une entrée dans user_roles avec le rôle "registered"
            try {
              await supabase.from('user_roles').insert({
                id: userId,
                role: 'registered',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              console.log('Rôle "registered" créé pour l\'utilisateur')
            } catch (insertError) {
              console.error('Erreur lors de la création du rôle par défaut:', insertError)
            }
          }
        } else if (userRoleData) {
          setUserRole(userRoleData.role as UserRoleType)
        }

        // Récupérer l'avatar de l'utilisateur
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', userId)
          .single()

        if (profileError) {
          // Ignorer l'erreur "No rows returned" (PGRST116)
          if (profileError.code !== 'PGRST116') {
            console.error('Erreur lors de la récupération de l\'avatar:', profileError)
          } else {
            // Si aucun profil n'est trouvé, créer un profil vide
            try {
              await supabase.from('profiles').insert({
                id: userId,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              console.log('Profil créé pour l\'utilisateur')
            } catch (insertError) {
              console.error('Erreur lors de la création du profil:', insertError)
            }
          }
        } else if (profileData?.avatar_url) {
          setAvatarUrl(profileData.avatar_url)
        }
      })
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error)
    }
  }

  // Fonction pour rafraîchir les données utilisateur
  const refreshUserData = async () => {
    if (user?.id) {
      await getUserData(user.id)
    }
  }

  // Fonction pour se déconnecter
  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setUserRole(null)
      setAvatarUrl(null)
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté avec succès',
      })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      toast({
        title: 'Erreur de déconnexion',
        description: 'Une erreur est survenue lors de la déconnexion',
        variant: 'destructive',
      })
    }
  }

  // Initialiser la session et configurer l'écouteur d'authentification
  useEffect(() => {
    let mounted = true

    const getInitialSession = async () => {
      setIsLoading(true)

      try {
        // Récupérer la session initiale
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          setSession(session)
          setUser(session?.user || null)
          
          if (session?.user) {
            await getUserData(session.user.id)
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    getInitialSession()

    // Configurer l'écouteur d'événements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log('Auth event:', event)
      
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        await getUserData(session.user.id)
      } else {
        setUserRole(null)
        setAvatarUrl(null)
      }

      setIsLoading(false)
    })

    return () => {
      mounted = false
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  // Valeur du contexte
  const value = {
    session,
    user,
    userRole,
    avatarUrl,
    isLoading,
    signOut,
    refreshUserData
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}