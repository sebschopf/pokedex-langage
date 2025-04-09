import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Gestion des langages | POKEDEX_DEV",
  description: "Gérez les langages de programmation",
}

export default async function AdminLanguagesPage() {
  const supabase = createServerSupabaseClient()

  // Vérifier si l'utilisateur est connecté et a le rôle admin ou validator
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/languages")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
    redirect("/")
  }

  // Récupérer les langages
  const { data: languages } = await supabase
    .from("languages")
    .select("id, name, slug, year_created, creator, type")
    .order("name")

  return (
    <AdminLayout userRole={userRole.role}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestion des langages</h1>
          <Button asChild>
            <Link href="/admin/languages/new">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un langage
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages?.map((language) => (
            <Card key={language.id}>
              <CardHeader>
                <CardTitle>{language.name}</CardTitle>
                <CardDescription>
                  {language.year_created && `Créé en ${language.year_created}`}
                  {language.creator && language.year_created && " par "}
                  {language.creator}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Type: {language.type || "Non spécifié"}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/admin/languages/${language.id}/edit`}>Modifier</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
