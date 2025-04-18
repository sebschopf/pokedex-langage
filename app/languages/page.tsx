import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLanguageBySlug } from "@/lib/server/api/languages"
import { LanguageDetail } from "@/components/language-detail"

// Définir les types spécifiques à cette page
type LanguagePageParams = {
  slug: string
}

type LanguagePageProps = {
  params: LanguagePageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

// Générer les métadonnées de la page
export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { slug } = params
  const language = await getLanguageBySlug(slug)

  if (!language) {
    return {
      title: "Langage non trouvé",
      description: "Le langage demandé n'existe pas",
    }
  }

  return {
    title: `${language.name} - Pokedex des Langages de Programmation`,
    description: language.shortDescription || `Découvrez tout sur ${language.name}`,
  }
}

// Fonction principale de la page
export default async function LanguagePage({ params }: LanguagePageProps) {
  const { slug } = params
  const language = await getLanguageBySlug(slug)

  if (!language) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <LanguageDetail language={language} />
    </div>
  )
}
