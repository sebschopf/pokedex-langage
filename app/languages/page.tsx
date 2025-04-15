import { Suspense } from "react"
import { getLanguages } from "@/lib/server/api/languages"
import { LanguageGrid } from "@/components/language-grid"
import { LanguageCardSkeleton } from "@/components/language-card-skeleton"
import CategoryTitle from "@/components/category-title"

// Fonction pour récupérer les données côté serveur
async function getLanguagesData(searchParams: { [key: string]: string | string[] | undefined }) {
  const query = typeof searchParams.query === "string" ? searchParams.query : ""
  const type = typeof searchParams.type === "string" ? searchParams.type : "all"
  const usageMin = typeof searchParams.usageMin === "string" ? Number.parseInt(searchParams.usageMin) : 0
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "name"
  const openSource = searchParams.openSource === "true"

  // Récupérer les langages depuis l'API
  const { data: languages, totalCount } = await getLanguages({
    page: 1,
    pageSize: 100, // Augmenter pour éviter la pagination côté client
    search: query,
    category: type !== "all" ? type : "",
    openSource: openSource ? true : undefined,
    minUsage: usageMin > 0 ? usageMin : undefined,
    sort: sort,
  })

  return { languages, totalCount }
}

export default async function LanguagesPage({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LanguageGridSkeleton />}>
        <LanguageGridServer searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

// Composant serveur pour charger les données
async function LanguageGridServer({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const { languages, totalCount } = await getLanguagesData(searchParams)

  return <LanguageGrid languages={languages} totalCount={totalCount} searchParams={searchParams} />
}

function LanguageGridSkeleton() {
  return (
    <div>
      <CategoryTitle title="Chargement des langages..." count={0} />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LanguageCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
