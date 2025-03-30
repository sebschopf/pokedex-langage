import SearchBar from "@/components/search-bar"
import FilterBar from "@/components/filter-bar"
import { LanguageGrid } from "@/components/language-grid"
import { getLanguages } from "@/lib/data"
import Link from "next/link"

export default async function Home() {
  const languages = await getLanguages()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-black uppercase tracking-tighter lcp-title">
          Pokedex des langages
        </h1>
        <Link
          href="/about"
          className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          À propos
        </Link>
      </div>

      <div className="space-y-4">
        <SearchBar />
        <FilterBar />
      </div>

      <LanguageGrid languages={languages} />
    </div>
  )
}
//
// import { useState } from "react"


