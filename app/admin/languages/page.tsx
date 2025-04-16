import { createServerComponentSupabaseClient } from "@/lib/auth/supabase-server"
import { dbToLanguage } from "@/lib/serveur/mapping"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash } from "lucide-react"

// Récupérer tous les langages pour l'administration
async function getLanguagesForAdmin() {
  const supabase = createServerComponentSupabaseClient()
  const { data, error } = await supabase.from("languages").select("*").order("name")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return []
  }

  // Utiliser la fonction de mapping pour convertir les données
  return data.map(dbToLanguage)
}

// Fonction pour supprimer un langage (sera utilisée dans une action serveur)
async function deleteLanguage(id: number) {
  "use server"

  const supabase = createServerComponentSupabaseClient()
  const { error } = await supabase.from("languages").delete().eq("id", id)

  if (error) {
    console.error(`Erreur lors de la suppression du langage ${id}:`, error)
    throw new Error(`Erreur lors de la suppression du langage: ${error.message}`)
  }

  return { success: true }
}

export default async function AdminLanguagesPage() {
  const languages = await getLanguagesForAdmin()

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration des Langages</h1>
        <Link href="/admin/languages/new">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            Ajouter un langage
          </Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Année</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {languages.map((language) => (
              <tr key={language.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{language.name}</div>
                  <div className="text-sm text-gray-500">{language.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{language.type || "Non spécifié"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{language.yearCreated || "Non spécifié"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link href={`/admin/languages/edit/${language.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit size={16} />
                        Modifier
                      </Button>
                    </Link>
                    <form
                      action={async () => {
                        // Convertir l'ID en string si nécessaire
                        await deleteLanguage(language.id)
                      }}
                    >
                      <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <Trash size={16} />
                        Supprimer
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
