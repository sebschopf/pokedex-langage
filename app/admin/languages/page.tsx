import { createServerClient } from "@/lib/supabase/server"
import { dbToLanguage } from "@/lib/server/mapping"
import { LanguageTable } from "@/components/admin/language-table"
import RoleProtected from "@/components/auth/role-protected"
import { AdminHeader } from "@/components/admin/admin-header"
import type { DbLanguage } from "@/types/database/language"

export const dynamic = "force-dynamic"

export default async function AdminLanguagesPage() {
  const supabase = createServerClient()

  // Récupérer tous les langages
  const { data: languagesData, error } = await supabase.from("languages").select("*").order("name")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p>Une erreur est survenue lors de la récupération des langages.</p>
      </div>
    )
  }

  // Convertir les données avec la fonction de mapping
  const languages = languagesData ? languagesData.map((item) => dbToLanguage(item as DbLanguage)) : []

  // Récupérer les statistiques pour chaque langage
  const languagesWithStats = await Promise.all(
    languages.map(async (language) => {
      // Récupérer le nombre de frameworks pour ce langage
      const { count: frameworksCount, error: frameworksError } = await supabase
        .from("libraries")
        .select("*", { count: "exact", head: true })
        .eq("language_id", language.id)
        .eq("technology_type", "framework")

      // Récupérer le nombre de bibliothèques pour ce langage
      const { count: librariesCount, error: librariesError } = await supabase
        .from("libraries")
        .select("*", { count: "exact", head: true })
        .eq("language_id", language.id)
        .eq("technology_type", "library")

      // Récupérer le nombre de corrections pour ce langage
      const { count: correctionsCount, error: correctionsError } = await supabase
        .from("corrections")
        .select("*", { count: "exact", head: true })
        .eq("language_id", language.id)

      if (frameworksError || librariesError || correctionsError) {
        console.error("Erreur lors de la récupération des statistiques:", {
          frameworksError,
          librariesError,
          correctionsError,
        })
      }

      return {
        ...language,
        frameworksCount: frameworksCount || 0,
        librariesCount: librariesCount || 0,
        correctionsCount: correctionsCount || 0,
      }
    }),
  )

  // Trier les langages par popularité (nombre de frameworks + bibliothèques)
  const sortedLanguages = [...languagesWithStats].sort((a, b) => {
    const aPopularity = (a.frameworksCount || 0) + (a.librariesCount || 0)
    const bPopularity = (b.frameworksCount || 0) + (b.librariesCount || 0)
    return bPopularity - aPopularity
  })

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <RoleProtected requiredRole="admin">
      <div className="container mx-auto py-8">
        <AdminHeader
          title="Gestion des langages"
          createLink="/admin/languages/create"
          createLabel="Ajouter un langage"
        />

        <LanguageTable languages={sortedLanguages} formatDate={formatDate} />
      </div>
    </RoleProtected>
  )
}
