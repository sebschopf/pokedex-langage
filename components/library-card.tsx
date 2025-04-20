"use client"

import Link from "next/link"
import type { Library } from "@/types/models/library"
import { cn } from "@/utils/theme/cn"
import { routes } from "@/utils/routes"

interface LibraryCardProps {
  library: Library
}

export function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link
      href={routes.libraries.detail(library.slug)} // Maintenant nous pouvons utiliser directement library.slug
      className={cn(
        "block h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1",
        "dark:bg-[#2a2a20] dark:border-[#3a3a30] dark:shadow-[8px_8px_0px_0px_rgba(58,58,48,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(58,58,48,1)]",
      )}
      aria-label={`Voir les détails de ${library.name}`}
      prefetch={false}
    >
      <div className="p-4 pb-6 flex flex-col h-full">
        {/* Badges en haut */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-600 text-white font-bold px-2 py-1">{library.technologyType || "Bibliothèque"}</div>

          {library.isOpenSource !== undefined && (
            <div
              className={`${
                library.isOpenSource ? "bg-green-500 text-white" : "bg-red-600 text-white"
              } font-bold px-2 py-1`}
            >
              {library.isOpenSource ? "Open Source" : "Propriétaire"}
            </div>
          )}
        </div>

        {/* Nom de la bibliothèque */}
        <h2 className="text-2xl font-bold mb-4">{library.name}</h2>

        {/* Description */}
        <p className="text-center mb-4 line-clamp-3">{library.description || "Aucune description disponible"}</p>

        {/* Langage associé */}
        {library.languageId && (
          <div className="mt-auto">
            <p className="font-bold mb-1">ID du langage associé: {library.languageId}</p>
          </div>
        )}
      </div>
    </Link>
  )
}
