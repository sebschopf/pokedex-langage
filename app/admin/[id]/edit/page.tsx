import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { hasRole } from "@/lib/permissions"
import { LanguageForm } from "@/./components/admin/language-form"
import { LanguageLogoUpload } from "@/components/language-logo-upload"

export const metadata = {
  title: "Modifier un langage | POKEDEX_DEV",
  description: "Modifier les informations d'un langage de programmation",
}

export default async function EditLanguagePage({ params }: { params: { id: string } }) {
  // Vérifier si l'utilisateur est admin ou validator
  const isAdminOrValidator = await hasRole("validator")
  
  if (!isAdminOrValidator) {
    redirect("/")
  }
  
  const supabase = createServerSupabaseClient()
  
  // Récupérer le langage
  const { data: language, error } = await supabase
    .from("languages")
    .select("*")
    .eq("id", params.id)
    .single()
  
  if (error || !language) {
    console.error("Erreur lors de la récupération du langage:", error)
    redirect("/admin/languages")
  }
  
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modifier un langage</h1>
        <Button asChild>
          <a href="/admin/languages">Retour à la liste</a>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du langage</CardTitle>
              <CardDescription>Modifier les informations de base du langage</CardDescription>
            </CardHeader>
            <CardContent>
              <LanguageForm language={language} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <LanguageLogoUpload
            languageId={language.id}
            currentLogoPath={language.logo_path}
            onUpload={async (path) => {
              // Cette fonction sera appelée côté client
              // La mise à jour sera gérée par le composant LanguageLogoUpload
            }}
          />
          
          {/* Autres cartes pour les fonctionnalités supplémentaires */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Frameworks populaires</CardTitle>
              <CardDescription>Gérer les frameworks associés à ce langage</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href={`/admin/languages/${language.id}/frameworks`}>
                  Gérer les frameworks
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
