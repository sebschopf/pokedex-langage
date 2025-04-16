import { notFound } from "next/navigation"
import { createServerClient } from "@/lib/supabase"
import { dbToLanguage } from "@/lib/server/mapping"
import { LanguageForm } from "@/components/admin/language-form"
import { AdminHeader } from "@/components/admin/admin-header"
import { RoleProtected } from "@/components/auth/role-protected"
import LanguageLogoUpload from "@/components/language-logo-upload"
import type { DbLanguage } from "@/types/database/language"

export default async function EditLanguagePage({ params }: { params: { id: string } }) {
  // Vérifier si l'ID est un nombre valide
  const languageId = Number.parseInt(params.id)
  if (isNaN(languageId)) {
    notFound()
  }

  // Récupérer les données du langage
  const supabase = createServerClient()
  const { data, error } = await supabase.from("languages").select("*").eq("id", languageId).single()

  if (error || !data) {
    console.error("Erreur lors de la récupération du langage:", error)
    notFound()
  }

  // Convertir les données en format d'application
  const language = dbToLanguage(data as DbLanguage)

  // Fonction pour générer le chemin de l'image
  const getImagePath = (path: string): string => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    return `/api/storage/logos/${path}`
  }

  return (
    <RoleProtected requiredRole="admin">
      <div className="container mx-auto py-8">
        <AdminHeader
          title={`Modifier ${language.name}`}
          description="Mettre à jour les informations du langage"
          createLink="/admin/languages/create"
          createLabel="Ajouter un langage"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <LanguageForm language={language} />
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Logo</h2>
              <LanguageLogoUpload languageId={String(languageId)} languageName={language.name} />
            </div>
          </div>
        </div>
      </div>
    </RoleProtected>
  )
}
