"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LanguageError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Erreur dans la page de langage:", error)
  }, [error])

  return (
    <div className="container py-8 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 bg-white border-4 border-black text-black font-bold hover:bg-yellow-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Link>

      <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold mb-4">Erreur lors du chargement du langage</h2>
        <p className="mb-6">{error.message || "Impossible de charger les informations de ce langage."}</p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  )
}
