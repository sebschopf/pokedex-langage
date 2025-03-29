import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollToTop from "@/components/scroll-to-top"

// Configuration optimisée de la police
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata = {
  title: "Pokedex des langages de programmation",
  description: "Une encyclopédie des langages de programmation",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-yellow-300 min-h-screen flex flex-col">
        <main className="container mx-auto py-8 px-4 flex-grow">
          {children}
          <ScrollToTop />
        </main>
        <footer className="h-12 bg-black text-white text-center">
          <div className="container mx-auto py-3">
            © {new Date().getFullYear()} Pokedex des langages de programmation
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'