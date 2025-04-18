import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getLanguageBySlug } from "@/lib/server/api/languages"
import { LanguageDetail } from "@/components/language-detail"

// Définir les types selon les conventions de Next.js App Router
type PageParams = {
  slug: string
}

type PageProps = {
  params: PageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

// Générer les métadonnées de la page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    description: language.short_description || `Découvrez tout sur ${language.name}`,
  }
}

// Fonction principale de la page
export default async function LanguagePage({ params }: PageProps) {
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
