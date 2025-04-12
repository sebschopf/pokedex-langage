"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"

export default function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [isFocused, setIsFocused] = useState(false)

  // Focus sur l'input au chargement
  useEffect(() => {
    setQuery(searchParams.get("query") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (query) {
      params.set("query", query)
    } else {
      params.delete("query")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    setQuery("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("query")
    router.push(`${pathname}?${params.toString()}`)

    // Focus sur l'input après effacement
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Recherche automatique après un délai de frappe
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== searchParams.get("query")) {
        const params = new URLSearchParams(searchParams.toString())

        if (query) {
          params.set("query", query)
        } else {
          params.delete("query")
        }

        router.push(`${pathname}?${params.toString()}`)
      }
    }, 500) // Délai de 500ms

    return () => clearTimeout(timer)
  }, [query, router, pathname, searchParams])

  return (
    <div className="relative" role="search" aria-label="Rechercher un langage de programmation">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Rechercher un langage..."
            className={`w-full p-4 pl-12 border-4 border-black font-medium text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${
              isFocused ? "border-blue-500" : ""
            }`}
            aria-label="Rechercher un langage de programmation"
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            aria-label="Lancer la recherche"
          >
            <Search size={20} className="text-black" />
          </button>
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 p-1 rounded-full"
              aria-label="Effacer la recherche"
            >
              <X size={20} className="text-black" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
