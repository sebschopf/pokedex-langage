"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Utiliser React.ComponentProps pour inférer le type des props à partir du composant
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Éviter les problèmes d'hydratation en ne rendant le contenu qu'après le montage côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </NextThemesProvider>
  )
}

// Contexte pour exposer et gérer le thème dans toute l'application
type ThemeContextType = {
  theme: string | undefined
  setTheme: (theme: string) => void
  isDarkTheme: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: undefined,
  setTheme: () => null,
  isDarkTheme: false,
})

export const useTheme = () => useContext(ThemeContext)
