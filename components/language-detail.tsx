import type { Language } from "@/types/models/language"
import type { Library } from "@/types/models/library"
import Link from "next/link"
import { routes } from "@/utils/routes"
import LanguageImage from "./language-image"
import { cn } from "@/utils/theme/cn"
import { getTypeBadgeColor } from "@/utils/theme/get-type-badge-color"

interface LanguageDetailProps {
  language: Language
  frameworks?: Library[]
  libraries?: Library[]
}

export function LanguageDetail({ language, frameworks = [], libraries = [] }: LanguageDetailProps) {
  // Préparer l'URL de l'image
  const imageSrc = language.logoPath || `/images/languages/${language.slug || language.name.toLowerCase()}.svg`

  // Valeur par défaut pour le type
  const languageType = language.type || "Autre"

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image du langage */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-48 h-48 relative flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
            <LanguageImage
              src={imageSrc}
              alt={`Logo ${language.name}`}
              width={160}
              height={160}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </div>

        {/* Informations principales */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={cn("px-3 py-1 text-white font-medium rounded-md", getTypeBadgeColor(languageType))}>
              {languageType}
            </span>

            {language.isOpenSource !== undefined && (
              <span
                className={cn(
                  "px-3 py-1 text-white font-medium rounded-md",
                  language.isOpenSource ? "bg-green-600" : "bg-red-600",
                )}
              >
                {language.isOpenSource ? "Open Source" : "Propriétaire"}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{language.name}</h1>

          {language.shortDescription && (
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">{language.shortDescription}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {language.creator && (
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Créateur</h3>
                  <p>{language.creator}</p>
                </div>
              )}

              {language.yearCreated && (
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Année de création</h3>
                  <p>{language.yearCreated}</p>
                </div>
              )}
            </div>

            <div>
              {language.usageRate !== undefined && (
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Taux d'utilisation</h3>
                  <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 dark:bg-yellow-600 flex items-center pl-2 font-medium"
                      style={{ width: `${language.usageRate}%` }}
                    >
                      {language.usageRate}%
                    </div>
                  </div>
                </div>
              )}

              {language.usedFor && (
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Utilisé pour</h3>
                  <p>{language.usedFor}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description complète */}
      {language.description && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>{language.description}</p>
          </div>
        </div>
      )}

      {/* Frameworks associés */}
      {frameworks && frameworks.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Frameworks populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {frameworks.map((framework) => (
              <Link
                key={framework.id}
                href={routes.frameworks.detail(framework.slug)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-bold">{framework.name}</h3>
                {framework.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{framework.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bibliothèques associées */}
      {libraries && libraries.length > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Bibliothèques populaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {libraries.map((library) => (
              <Link
                key={library.id}
                href={routes.libraries.detail(library.slug)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="font-bold">{library.name}</h3>
                {library.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{library.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
