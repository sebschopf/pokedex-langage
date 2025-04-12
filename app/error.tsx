"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Erreur globale:", error)
  }, [error])

  return (
    <div className="container py-8">
      <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold mb-4">Une erreur s'est produite</h2>
        <p className="mb-6">{error.message || "Quelque chose s'est mal passé lors du chargement de cette page."}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}
