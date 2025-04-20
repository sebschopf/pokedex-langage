import { getLanguages } from "@/lib/server/api/languages"
import SearchBar from "@/components/search-bar"
import FilterBar from "@/components/filter-bar"
import { LanguageGrid } from "@/components/language-grid"
import CategoryTitle from "@/components/category-title"
import type { LanguageSearchParams } from "@/types/dto/search-params"

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

// Fonction pour récupérer les données
async function getHomePageData(searchParams: LanguageSearchParams) {
  try {
    // Convertir les paramètres de recherche en options pour l'API
    const options = convertSearchParamsToApiOptions(searchParams)

    // Appel à l'API avec le nouveau mapping
    const { data: languages, totalCount } = await getLanguages(options)

    return {
      languages,
      languagesCount: languages.length,
      totalCount,
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données de la page d'accueil:", error)
    return {
      languages: [],
      languagesCount: 0,
      totalCount: 0,
    }
  }
}

// Type pour les props de page conforme à ce que Next.js attend
type HomePageProps = {
  params?: any
  searchParams?: any
}

// Composant principal de la page
export default async function HomePage({ searchParams = {} }: HomePageProps) {
  // Convertir searchParams en LanguageSearchParams pour le typage fort
  const typedSearchParams = searchParams as unknown as LanguageSearchParams

  const { languages, languagesCount, totalCount } = await getHomePageData(typedSearchParams)
  const query = typedSearchParams.query || ""

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Pokedex des Langages de Programmation</h1>
        <p className="text-xl">Découvrez notre collection de {totalCount} langages de programmation</p>
      </div>

      <div className="space-y-6">
        <SearchBar />
        <FilterBar />
      </div>

      <CategoryTitle
        title={query ? `Recherche: "${query}"` : "Tous les langages"}
        count={languagesCount}
        subtitle={`${languagesCount} sur ${totalCount} langages`}
      />

      <LanguageGrid languages={languages} totalCount={totalCount} searchParams={searchParams as any} />
    </div>
  )
}
