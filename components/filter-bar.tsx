"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Récupérer les valeurs actuelles des paramètres
  const currentType = searchParams.get("type") || "all"
  const currentUsage = searchParams.get("usageMin") || "0"
  const currentSort = searchParams.get("sort") || "name"
  const currentOpenSource = searchParams.get("openSource") || "false"

  // Créer une fonction pour mettre à jour les paramètres de recherche
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value && value !== "all" && value !== "0" && value !== "name" && value !== "false") {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  // Gestionnaires d'événements pour les changements de filtres
  const handleTypeChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("type", value)}`)
  }

  const handleUsageChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("usageMin", value)}`)
  }

  const handleSortChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("sort", value)}`)
  }

  const handleOpenSourceChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("openSource", value)}`)
  }

  return (
    <div
      className="flex flex-col md:flex-row gap-4 p-4 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      role="region"
      aria-label="Filtres de recherche"
    >
      <div className="flex-1">
        <label htmlFor="type-filter" className="block font-bold mb-2">
          Type de langage:
        </label>
        <select
          id="type-filter"
          value={currentType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full p-2 border-4 border-black font-medium"
          aria-controls="language-results"
        >
          <option value="all">Tous les types</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
          <option value="Mobile">Mobile</option>
          <option value="Data">Data</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="usage-filter" className="block font-bold mb-2">
          Taux d'utilisation:
        </label>
        <select
          id="usage-filter"
          value={currentUsage}
          onChange={(e) => handleUsageChange(e.target.value)}
          className="w-full p-2 border-4 border-black font-medium"
          aria-controls="language-results"
        >
          <option value="0">Tous</option>
          <option value="25">25% et plus</option>
          <option value="50">50% et plus</option>
          <option value="75">75% et plus</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="sort-filter" className="block font-bold mb-2">
          Trier par:
        </label>
        <select
          id="sort-filter"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full p-2 border-4 border-black font-medium"
          aria-controls="language-results"
        >
          <option value="name">Nom (A-Z)</option>
          <option value="usage">Taux d'utilisation</option>
          <option value="year">Année de création</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="opensource-filter" className="block font-bold mb-2">
          Licence:
        </label>
        <select
          id="opensource-filter"
          value={currentOpenSource}
          onChange={(e) => handleOpenSourceChange(e.target.value)}
          className="w-full p-2 border-4 border-black font-medium"
          aria-controls="language-results"
        >
          <option value="false">Tous les langages</option>
          <option value="true">Open Source uniquement</option>
        </select>
      </div>
    </div>
  )
}
