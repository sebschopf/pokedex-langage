import { getLanguages } from "@/lib/server/api/languages"
import SearchBar from "@/components/search-bar"
import FilterBar from "@/components/filter-bar"

// Composant pour afficher le nombre de résultats
function ResultsCount({ count, total }: { count: number; total: number }) {
  return (
    <div className="text-right text-gray-600 mb-4">
      {count === total ? (
        <p>Affichage de tous les {count} langages</p>
      ) : (
        <p>
          Affichage de {count} sur {total} langages
        </p>
      )}
    </div>
  )
}

// Composant pour afficher les langages
function LanguageGrid({ languages }: { languages: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="language-results">
      {languages.map((language) => (
        <div key={language.id} className="border-4 border-black p-4 bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-bold mb-2">{language.name}</h2>
          <p className="mb-4">{language.shortDescription}</p>
          <a
            href={`/languages/${language.slug}`}
            className="inline-block px-4 py-2 bg-black text-white font-bold hover:bg-gray-800"
          >
            Voir les détails
          </a>
        </div>
      ))}

      {languages.length === 0 && (
        <div className="col-span-3 text-center text-gray-500 my-12">
          <p>Aucun langage ne correspond à vos critères de recherche.</p>
        </div>
      )}
    </div>
  )
}

// Composant principal avec les paramètres de recherche
async function getHomePageData(searchParams: {
  query?: string
  type?: string
  usageMin?: string
  sort?: string
  openSource?: string
  page?: string
  pageSize?: string
}) {
  try {
    const page = Number(searchParams.page) || 1
    const pageSize = Number(searchParams.pageSize) || 100 // Augmenter pour afficher plus de langages

    // Convertir les paramètres de recherche pour la fonction getLanguages
    const options = {
      page,
      pageSize,
      search: searchParams.query,
      category: searchParams.type !== "all" ? searchParams.type : undefined,
      minUsage: searchParams.usageMin ? Number(searchParams.usageMin) : undefined,
      sort: (searchParams.sort as "name" | "usage" | "year") || "name",
      openSource: searchParams.openSource === "true" ? true : undefined,
    }

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

// Composant principal de la page
export default async function Home({
  searchParams,
}: {
  searchParams: {
    query?: string
    type?: string
    usageMin?: string
    sort?: string
    openSource?: string
    page?: string
    pageSize?: string
  }
}) {
  const { languages, languagesCount, totalCount } = await getHomePageData(searchParams)

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Pokedex des Langages de Programmation</h1>
      <p className="text-xl mb-8">Découvrez notre collection de {totalCount} langages de programmation</p>

      <div className="space-y-6 mb-8">
        <SearchBar />
        <FilterBar />
      </div>

      <ResultsCount count={languagesCount} total={totalCount} />

      <LanguageGrid languages={languages} />
    </main>
  )
}
