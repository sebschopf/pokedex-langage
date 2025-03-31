import { getLanguageBySlug, getFrameworksByLanguageId } from "@/lib/api"
import type { Library } from "@/types/library"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, BookOpen } from "lucide-react"
import LanguageImage from "@/components/language-image"

export default async function LanguagePage({ params }: { params: { slug: string } }) {
  console.log("Slug reçu:", params.slug)

  const language = await getLanguageBySlug(params.slug)
  console.log("Langage trouvé:", language ? language.name : "Non trouvé")

  if (!language) {
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
  }

  // Fonction pour obtenir le nom correct de l'image
  const getImageName = (name: string) => {
    if (name === "C++") return "cpp"
    if (name === "C#") return "csharp"
    return name.toLowerCase().replace(/[^a-z0-9]/g, "")
  }

  // Déterminer la couleur du badge de type
  const getTypeBadgeColor = (type = "Autre") => {
    if (!type) return "bg-gray-600"

    switch (type.toLowerCase()) {
      case "backend":
        return "bg-purple-600"
      case "frontend":
        return "bg-blue-500"
      case "fullstack":
        return "bg-indigo-600"
      case "mobile":
        return "bg-red-500"
      case "système":
      case "systeme":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  // Préparer l'URL de l'image
  const imageSrc = language.logo_path || `/images/${getImageName(language.name)}.svg`

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
              <div className={`${getTypeBadgeColor(language.type || "Autre")} text-white font-bold px-2 py-1`}>
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
                {language.usedFor &&
                  language.usedFor.split(",").map((use, index) => (
                    <p key={index} className="flex items-start">
                      <span
                        className="inline-block bg-red-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                        aria-hidden="true"
                      >
                        ▶
                      </span>
                      <span>{use.trim()}</span>
                    </p>
                  ))}
                {!language.usedFor && <p>Information non disponible</p>}
              </div>
            </div>

            <div className="border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-bold text-xl border-b-2 border-black pb-1">Forces:</h4>
              <ul className="mt-2 space-y-2">
                {language.strengths &&
                  language.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className="inline-block bg-green-600 text-white font-black px-2 py-0 mr-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-3"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span className="text-lg">{strength}</span>
                    </li>
                  ))}
                {!language.strengths && <li>Information non disponible</li>}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Frameworks populaires</h3>
            {frameworks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frameworks.map((framework) => (
                  <Card
                    key={framework.id}
                    className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <CardHeader className="py-3 border-b-2 border-black">
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      {framework.unique_selling_point && (
                        <p className="text-sm text-gray-600 mt-1 font-medium">{framework.unique_selling_point}</p>
                      )}
                    </CardHeader>
                    <CardContent className="py-3 space-y-3">
                      <p className="text-sm mb-3">{framework.description}</p>

                      {/* Afficher used_for s'il est disponible */}
                      {framework.used_for && (
                        <div>
                          <h4 className="text-xs font-bold bg-black text-white inline-block px-2 py-1 mb-1">
                            UTILISÉ POUR
                          </h4>
                          <p className="text-sm">{framework.used_for}</p>
                        </div>
                      )}

                      {/* Afficher best_for s'il est disponible */}
                      {framework.best_for && (
                        <div>
                          <h4 className="text-xs font-bold bg-black text-white inline-block px-2 py-1 mb-1">
                            IDÉAL POUR
                          </h4>
                          <p className="text-sm">{framework.best_for}</p>
                        </div>
                      )}

                      {/* Afficher features s'il est disponible */}
                      {framework.features && framework.features.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold bg-black text-white inline-block px-2 py-1 mb-1">
                            FONCTIONNALITÉS
                          </h4>
                          <ul className="text-sm list-disc pl-5">
                            {framework.features.slice(0, 3).map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                            {framework.features.length > 3 && (
                              <li className="text-xs text-gray-600">Et {framework.features.length - 3} autres...</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Afficher version s'il est disponible */}
                      {framework.version && (
                        <div className="text-xs">
                          <span className="font-bold">Version:</span> {framework.version}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-2">
                        {framework.officialWebsite && (
                          <a
                            href={framework.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm bg-blue-600 text-white px-2 py-1 rounded-sm hover:bg-blue-700"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> Site officiel
                          </a>
                        )}
                        {framework.github_url && (
                          <a
                            href={framework.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm bg-gray-800 text-white px-2 py-1 rounded-sm hover:bg-gray-900"
                          >
                            <Github className="h-3 w-3 mr-1" /> GitHub
                          </a>
                        )}
                        {framework.documentation_url && (
                          <a
                            href={framework.documentation_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm bg-green-600 text-white px-2 py-1 rounded-sm hover:bg-green-700"
                          >
                            <BookOpen className="h-3 w-3 mr-1" /> Documentation
                          </a>
                        )}
                      </div>

                      {framework.popularity && (
                        <div className="mt-3">
                          <p className="text-xs mb-1">Popularité: {framework.popularity}%</p>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-full bg-yellow-400 rounded-full"
                              style={{ width: `${framework.popularity}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

