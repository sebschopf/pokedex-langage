import { getLanguageBySlug } from "@/lib/server/api/languages"
import { getFrameworksByLanguageId } from "@/lib/server/api/libraries"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LanguageImage from "@/components/language-image"
import CategoryTitle from "@/components/category-title"
import FrameworkCard from "@/components/framework-card"
import { getImageName } from "@/utils/image"
import { getTypeBadgeColor } from "@/utils/theme"
import ScrollToTop from "@/components/scroll-to-top"
import TechnologyNavigation from "@/components/technology-navigation"
import type { Library } from "@/types/models/library"

// Revalider la page toutes les heures
export const revalidate = 3600

// Définir les types de paramètres selon les conventions Next.js
interface PageParams {
  slug: string
}

interface PageProps {
  params: PageParams
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function LanguagePage({ params }: PageProps) {
  const { slug } = params

  // Logs de débogage
  console.log("Slug reçu dans page.tsx:", slug)

  try {
    // Normaliser le slug
    const normalizedSlug = slug.toLowerCase()
    console.log("Slug normalisé:", normalizedSlug)

    // Récupérer le langage
    const language = await getLanguageBySlug(normalizedSlug)
    console.log("Langage trouvé:", language ? language.name : "Non trouvé")

    if (!language) {
      console.error(`Langage non trouvé pour le slug: ${normalizedSlug}`)
      notFound()
    }

    // Récupérer les frameworks avec gestion d'erreur
    let frameworks: Library[] = []
    try {
      if (language && language.id) {
        frameworks = await getFrameworksByLanguageId(language.id)
        console.log("Frameworks trouvés:", frameworks.length)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des frameworks:", error)
      // Continuer avec un tableau vide
      frameworks = []
    }

    // Regrouper les frameworks par catégorie
    const frameworksByCategory: Record<string, Library[]> = {}

    frameworks.forEach((framework) => {
      // Utiliser technologyType ou 'Autre' comme catégorie
      const category = framework.technologyType || "Autre"
      if (!frameworksByCategory[category]) {
        frameworksByCategory[category] = []
      }
      frameworksByCategory[category].push(framework)
    })

    // Trier les catégories
    const sortedCategories = Object.keys(frameworksByCategory).sort((a, b) => {
      // Mettre 'Autre' à la fin
      if (a === "Autre") return 1
      if (b === "Autre") return -1
      return a.localeCompare(b)
    })

    // Préparer l'URL de l'image
    const imageSrc = language.logoPath || `/images/${getImageName(language.name)}.svg`

    // Transformer les données pour les frameworks
    const frameworksData: { [key: string]: any } = {}
    frameworks.forEach((framework) => {
      frameworksData[framework.name] = {
        name: framework.name,
        description: framework.description || `Framework pour ${language.name}`,
        usedFor: framework.usedFor || `Développement avec ${language.name}`,
        features: Array.isArray(framework.features)
          ? framework.features
          : framework.features
            ? [framework.features]
            : [`Framework pour ${language.name}`],
        officialWebsite: framework.officialWebsite || null,
        uniqueSellingPoint: framework.uniqueSellingPoint || null,
        bestFor: framework.bestFor || null,
        version: framework.version || "N/A",
        documentation: framework.documentationUrl || null,
        githubUrl: framework.githubUrl || null,
        subtype: framework.subtype || null,
        popularity: framework.popularity || null,
      }
    })

    return (
      <div className="container py-8 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-white border-4 border-black text-black font-bold hover:bg-yellow-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </Link>

        <Card className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="flex flex-row items-center gap-4 border-b-4 border-black">
            <div className="w-16 h-16 relative">
              <LanguageImage src={imageSrc} alt={language.name} width={64} height={64} className="object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${getTypeBadgeColor(language.type)} text-white font-bold px-2 py-1`}>
                  {language.type || "Autre"}
                </div>
                {language.isOpenSource ? (
                  <div className="bg-green-500 text-white font-bold px-2 py-1">Open Source</div>
                ) : (
                  <div className="bg-red-600 text-white font-bold px-2 py-1">Propriétaire</div>
                )}
                {language.yearCreated && (
                  <div className="bg-black text-white font-bold px-2 py-1">{language.yearCreated}</div>
                )}
              </div>
              <CardTitle className="text-3xl">{language.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p>{language.shortDescription || "Aucune description disponible"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-bold text-xl border-b-2 border-black pb-1">Utilisé pour:</h4>
                <div className="text-lg mt-2 space-y-2">
                  {language.usedFor ? (
                    language.usedFor.split(",").map((use: string, index: number) => (
                      <p key={index} className="flex items-start">
                        <span
                          className="inline-block bg-red-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                          aria-hidden="true"
                        >
                          ▶
                        </span>
                        <span>{use.trim()}</span>
                      </p>
                    ))
                  ) : (
                    <p>Information non disponible</p>
                  )}
                </div>
              </div>

              <div className="border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-bold text-xl border-b-2 border-black pb-1">Forces:</h4>
                <ul className="mt-2 space-y-2">
                  {language.strengths && Array.isArray(language.strengths) ? (
                    language.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span
                          className="inline-block bg-green-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                          aria-hidden="true"
                        >
                          +
                        </span>
                        <span className="text-lg">{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li>Information non disponible</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Navigation des technologies */}
            {frameworks.length > 0 && (
              <TechnologyNavigation categories={sortedCategories} languageName={language.name} />
            )}

            {frameworks.length > 0 ? (
              <div className="space-y-8">
                {sortedCategories.map((category) => (
                  <div
                    key={category}
                    className="space-y-4"
                    id={`category-${category.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    <CategoryTitle title={`${language.name} - ${category}`} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {frameworksByCategory[category].map((framework) => (
                        <FrameworkCard
                          key={framework.id}
                          name={framework.name}
                          language={language.name}
                          frameworksData={frameworksData}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-4 border-black p-4 bg-gray-100">
                <p className="font-bold text-center">Aucun framework trouvé pour ce langage.</p>
                <p className="text-center mt-2">
                  Vous pouvez suggérer des frameworks en utilisant le formulaire de correction.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <ScrollToTop />
      </div>
    )
  } catch (error) {
    console.error("Erreur lors de la récupération du langage:", error)
    notFound()
  }
}
