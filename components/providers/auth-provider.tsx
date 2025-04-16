"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useUser, type UserData } from "@/hooks/use-user"
import { signOut } from "@/lib/client/auth-helpers"

// Étendre l'interface UserData pour inclure la fonction de déconnexion
interface AuthContextType extends UserData {
  signOut: () => Promise<void>
}

// Créer le contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Utiliser le hook useUser pour obtenir les données utilisateur
  const userData = useUser()

  // Valeur du contexte avec les données utilisateur et la fonction de déconnexion
  const value: AuthContextType = {
    ...userData,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook pour accéder au contexte d'authentification
 * @returns Le contexte d'authentification
 * @throws Error si utilisé en dehors d'un AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
