import { getLanguageBySlug } from "@/lib/server/api/languages"
import { getFrameworksByLanguageId } from "@/lib/server/api/frameworks"
import { getLibrariesByLanguageId } from "@/lib/server/api/libraries"
import { LanguageDetail } from "@/components/language-detail"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface LanguagePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const language = await getLanguageBySlug(params.slug)

  if (!language) {
    return {
      title: "Langage non trouvé",
    }
  }

  return {
    title: `${language.name} - Langage de programmation`,
    description: language.shortDescription || `Découvrez le langage de programmation ${language.name}`,
  }
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const language = await getLanguageBySlug(params.slug)

  if (!language) {
    notFound()
  }

  // Récupérer les frameworks et bibliothèques associés
  const [frameworks, libraries] = await Promise.all([
    getFrameworksByLanguageId(language.id),
    getLibrariesByLanguageId(language.id),
  ])

  return (
    <div className="container py-8">
      <LanguageDetail language={language} frameworks={frameworks} libraries={libraries} />
    </div>
  )
}
