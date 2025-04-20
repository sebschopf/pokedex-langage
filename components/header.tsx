"use client"

import Link from "next/link"
import { AuthButton } from "./auth-button"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/theme/cn"
import { routes } from "@/utils/routes"

export default function Header() {
  const pathname = usePathname()

  // Fonction pour déterminer si un lien est actif
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Style pour les liens de navigation
  const navLinkClass = (path: string) =>
    cn(
      "font-bold transition-colors px-3 py-2 border-b-4",
      isActive(path)
        ? "border-black text-black dark:border-yellow-500 dark:text-yellow-500"
        : "border-transparent hover:border-gray-300 hover:text-gray-800 dark:hover:border-gray-600 dark:hover:text-gray-200",
    )

  return (
    <header className="border-b-4 border-black dark:border-gray-800 py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href={routes.home} className="text-2xl font-black">
            POKEDEX<span className="text-yellow-500">DEV</span>
          </Link>

          <nav className="hidden md:flex space-x-2">
            <Link href={routes.languages.index} className={navLinkClass(routes.languages.index)}>
              Langages
            </Link>
            <Link href={routes.frameworks.index} className={navLinkClass(routes.frameworks.index)}>
              Frameworks
            </Link>
            <Link href={routes.libraries.index} className={navLinkClass(routes.libraries.index)}>
              Bibliothèques
            </Link>
            <Link href={routes.categories.index} className={navLinkClass(routes.categories.index)}>
              Catégories
            </Link>
          </nav>
        </div>

        <AuthButton />
      </div>
    </header>
  )
}
