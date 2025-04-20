import { getLanguages } from "@/lib/server/api/languages"
import { LanguageGrid } from "@/components/language-grid"
import SearchBar from "@/components/search-bar"
import FilterBar from "@/components/filter-bar"
import CategoryTitle from "@/components/category-title"
import type { Metadata } from "next"
import type { LanguageSearchParams } from "@/types/dto/search-params"

export const metadata: Metadata = {
  title: "Langages de programmation",
  description: "Découvrez tous les langages de programmation populaires",
}

// Fonction pour convertir les paramètres de recherche en options pour l'API
function convertSearchParamsToApiOptions(searchParams: LanguageSearchParams) {
  return {
    page: Number(searchParams.page) || 1,
    pageSize: Number(searchParams.pageSize) || 100,
    search: searchParams.query,
    category: searchParams.type !== "all" ? searchParams.type : undefined,
    minUsage: searchParams.usageMin ? Number(searchParams.usageMin) : undefined,
    sort: (searchParams.sort as "name" | "usage" | "year") || "name",
    openSource: searchParams.openSource === "true" ? true : searchParams.openSource === "false" ? false : undefined,
  }
}

export default async function LanguagesPage({
  searchParams,
}: {
  searchParams: LanguageSearchParams
}) {
  // Convertir les paramètres de recherche en options pour l'API
  const options = convertSearchParamsToApiOptions(searchParams)

  // Appel à l'API
  const { data: languages, totalCount } = await getLanguages(options)
  const query = searchParams.query || ""

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Langages de programmation</h1>
        <p className="text-xl">Découvrez tous les langages de programmation populaires</p>
      </div>

      <div className="space-y-6">
        <SearchBar />
        <FilterBar />
      </div>

      <CategoryTitle
        title={query ? `Recherche: "${query}"` : "Tous les langages"}
        count={languages.length}
        subtitle={`${languages.length} sur ${totalCount} langages`}
      />

      <LanguageGrid
        languages={languages}
        totalCount={totalCount}
        searchParams={searchParams as { [key: string]: string | string[] | undefined }}
      />
    </div>
  )
}
