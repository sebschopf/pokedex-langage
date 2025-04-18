import type { DbLanguage } from "@/types/database/language"

interface LanguageDetailProps {
  language: DbLanguage
}

export function LanguageDetail({ language }: LanguageDetailProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{language.name}</h1>
      {language.shortDescription && <p className="text-lg text-gray-700 mb-6">{language.shortDescription}</p>}

      {/* Autres détails du langage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Informations générales</h2>
          <dl className="space-y-2">
            {language.creator && (
              <>
                <dt className="font-medium">Créateur</dt>
                <dd>{language.creator}</dd>
              </>
            )}
            {language.yearCreated && (
              <>
                <dt className="font-medium">Année de création</dt>
                <dd>{language.yearCreated}</dd>
              </>
            )}
            {language.type && (
              <>
                <dt className="font-medium">Type</dt>
                <dd>{language.type}</dd>
              </>
            )}
            {language.usedFor && (
              <>
                <dt className="font-medium">Utilisé pour</dt>
                <dd>{language.usedFor}</dd>
              </>
            )}
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Caractéristiques</h2>
          <dl className="space-y-2">
            {language.isOpenSource !== undefined && (
              <>
                <dt className="font-medium">Open Source</dt>
                <dd>{language.isOpenSource ? "Oui" : "Non"}</dd>
              </>
            )}
            {language.usageRate !== undefined && (
              <>
                <dt className="font-medium">Taux d'utilisation</dt>
                <dd>{language.usageRate}%</dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {language.description && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <div className="prose max-w-none">{language.description}</div>
        </div>
      )}
    </div>
  )
}
