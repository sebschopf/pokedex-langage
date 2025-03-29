import { Inter } from "next/font/google"

// Précharger la police avec display: swap pour éviter le blocage du rendu
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "Arial", "sans-serif"],
})

