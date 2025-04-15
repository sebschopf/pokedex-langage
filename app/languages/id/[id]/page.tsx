import { notFound } from "next/navigation"
import { createServerComponentSupabaseClient } from "@/lib/supabase-app-router"
import { dbToLanguage } from "@/lib/database-mapping"

// Récupérer les données du langage par ID
async function getLanguageById(id: string) {
  const supabase = createServerComponentSupabaseClient()
  const { data, error } = await supabase.from("languages").select("*").eq("id", id).single()

  if (error || !data) {
    console.error("Erreur lors de la récupération du langage:", error)
    return null
  }

  // Utiliser la fonction de mapping pour convertir les données
  return dbToLanguage(data)
}

export default async function LanguageByIdPage({ params }: { params: { id: string } }) {
  const language = await getLanguageById(params.id)

  if (!language) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{language.name}</h1>

      {/* Afficher les détails du langage */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 mb-4">{language.description || language.shortDescription}</p>

        {/* Autres détails du langage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Informations</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Créé en:</span> {language.yearCreated}
              </li>
              <li>
                <span className="font-medium">Créateur:</span> {language.creator || "Non spécifié"}
              </li>
              <li>
                <span className="font-medium">Type:</span> {language.type}
              </li>
              <li>
                <span className="font-medium">Open Source:</span> {language.isOpenSource ? "Oui" : "Non"}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Utilisations</h2>
            <p>{language.usedFor}</p>

            {language.strengths && language.strengths.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-4 mb-2">Points forts</h3>
                <ul className="list-disc pl-5">
                  {language.strengths.map((strength: string, index: number) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
