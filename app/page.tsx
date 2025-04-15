import { Suspense } from "react"
import { getLanguages } from "@/lib/server/api/languages"
import { LanguageGrid } from "@/components/language-grid"
import CategoryTitle from "@/components/category-title"
import { Skeleton } from "@/components/ui/skeleton"

// Utiliser une fonction de chargement de données côté serveur
async function getHomePageData() {
  try {
    // Récupérer les langages avec une taille de page plus grande pour éviter les requêtes multiples
    const { data: languages, totalCount } = await getLanguages({
      page: 1,
      pageSize: 20, // Augmenter la taille de la page
      search: "",
      category: "",
      subtype: "",
    })

    return { languages, totalCount }
  } catch (error) {
    console.error("Erreur lors du chargement des données de la page d'accueil:", error)
    return { languages: [], totalCount: 0 }
  }
}

export default async function Home() {
  // Charger les données côté serveur
  const { languages, totalCount } = await getHomePageData()

  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryTitle
        title="Langages de Programmation"
        description={`Découvrez notre collection de ${totalCount} langages de programmation`}
      />

      <Suspense fallback={<LanguageGridSkeleton />}>
        <LanguageGrid languages={languages} totalCount={totalCount} searchParams={{}} />
      </Suspense>
    </main>
  )
}

function LanguageGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-card rounded-lg shadow-md p-4">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-6 w-3/4 mt-4" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
      ))}
    </div>
  )
}
