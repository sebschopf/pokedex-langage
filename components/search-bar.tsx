"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  // Mettre à jour le terme de recherche lorsque les paramètres d'URL changent
  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("query", searchTerm)
    } else {
      params.delete("query")
    }

    // Réinitialiser la pagination
    params.delete("page")

    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un langage..."
          className="w-full p-4 pl-12 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          size={20}
        />
      </div>
      <button
        type="submit"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
      >
        Rechercher
      </button>
    </form>
  )
}
