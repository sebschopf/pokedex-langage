import { getLanguageBySlug, getFrameworksByLanguageId } from "@/lib/server/api/api"
import type { Library } from "@/types"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LanguageImage from "@/components/language-image"
import CategoryTitle from "@/components/category-title"
import FrameworkCard from "@/components/framework-card"
import { getImageName, getTypeBadgeColor } from "@/lib/utils"
import ScrollToTop from "@/components/scroll-to-top"
import TechnologyNavigation from "@/components/technology-navigation"

interface LanguagePageProps {
  params: Promise<{ slug: string }>
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  // Attendre la résolution de la promesse params
  const { slug } = await params
  console.log("Slug reçu:", slug)

  const language = await getLanguageBySlug(slug)
  console.log("Langage trouvé:", language ? language.name : "Non trouvé")

  if (!language) {
    notFound()
  }

  // Récupérer les frameworks avec gestion d'erreur
  let frameworks: Library[] = []
  try {
    if (language && language.id) {
      frameworks = await getFrameworksByLanguageId(language.id.toString())
      console.log("Frameworks trouvés:", frameworks.length)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des frameworks:", error)
    // Continuer avec un tableau vide
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

  // Trier les catégories pour avoir un ordre cohérent
  const sortedCategories = Object.keys(frameworksByCategory).sort((a, b) => {
    // Mettre 'Autre' à la fin
    if (a === "Autre") return 1
    if (b === "Autre") return -1
    return a.localeCompare(b)
  })

  // Préparer l'URL de l'image
  const imageSrc = language.logo || `/images/${getImageName(language.name)}.svg`

  // Assurez-vous que la transformation des données est correcte
  const frameworksData: { [key: string]: any } = {}
  frameworks.forEach((framework) => {
    // Utilisez l'ID comme clé pour éviter les problèmes de noms dupliqués
    frameworksData[framework.name] = {
      name: framework.name,
      description: framework.description || `Framework pour ${language.name}`,
      // Convertir les tableaux en chaînes si nécessaire
      usedFor: Array.isArray(framework.usedFor)
        ? framework.usedFor.join(", ")
        : framework.usedFor || `Développement avec ${language.name}`,
      // S'assurer que features est toujours un tableau
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

  // Ajoutez cette fonction de débogage juste avant le return
  console.log(
    "Frameworks disponibles:",
    frameworks.map((f) => f.name),
  )
  console.log("Données transformées:", frameworksData)

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
              {language.createdYear && (
                <div className="bg-black text-white font-bold px-2 py-1">{language.createdYear}</div>
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
                {language.usedFor && Array.isArray(language.usedFor) ? (
                  // Si usedFor est déjà un tableau, on l'utilise directement
                  language.usedFor.map((use: string, index: number) => (
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
                ) : language.usedFor ? (
                  // Si usedFor est une chaîne, on la divise en tableau
                  (language.usedFor as string)
                    .split(",")
                    .map((use: string, index: number) => (
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
                  // Si strengths est déjà un tableau, on l'utilise directement
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

          {/* Ajout du composant de navigation des technologies */}
          {frameworks.length > 0 && <TechnologyNavigation categories={sortedCategories} languageName={language.name} />}

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
}
