import type { DbLanguage } from "@/types/database/language"

interface LanguageDetailProps {
  language: DbLanguage
}

export function LanguageDetail({ language }: LanguageDetailProps) {
  // Implémentation du composant
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{language.name}</h1>
      {/* Reste du composant */}
    </div>
  )
}
