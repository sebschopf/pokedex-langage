import { notFound } from "next/navigation"
import { createServerComponentSupabaseClient } from "@/lib/supabase-app-router"
import { dbToLanguage } from "@/lib/database-mapping"
import type { Language } from "@/types/models/language"

// Récupérer les données du langage par ID
async function getLanguageById(id: string): Promise<Language | null> {
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-black mb-8 border-b-4 border-black pb-2">{language.name}</h1>

      {/* Afficher les détails du langage */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        <p className="text-gray-800 mb-6 text-lg">{language.description || language.shortDescription}</p>

        {/* Autres détails du langage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="border-4 border-black p-4 bg-yellow-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Informations</h2>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="font-bold text-lg">Créé en:</span>
                <span className="text-lg">{language.yearCreated}</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-lg">Créateur:</span>
                <span className="text-lg">{language.creator || "Non spécifié"}</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-lg">Type:</span>
                <span className="text-lg">{language.type}</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-lg">Open Source:</span>
                <span className="text-lg">{language.isOpenSource ? "Oui" : "Non"}</span>
              </li>
              {language.currentVersion && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Version actuelle:</span>
                  <span className="text-lg">{language.currentVersion}</span>
                </li>
              )}
              {language.difficulty !== undefined && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Difficulté:</span>
                  <span className="text-lg">{language.difficulty}/10</span>
                </li>
              )}
            </ul>
          </div>

          <div className="border-4 border-black p-4 bg-blue-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Utilisations</h2>
            {language.usedFor && <p className="text-lg mb-4">{language.usedFor}</p>}

            {language.strengths && language.strengths.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-bold mt-4 mb-2">Points forts</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {language.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-lg">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {language.popularFrameworks && language.popularFrameworks.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mt-4 mb-2">Frameworks populaires</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {language.popularFrameworks.map((framework: string, index: number) => (
                    <li key={index} className="text-lg">
                      {framework}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Liens */}
        {(language.websiteUrl || language.githubUrl) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Liens</h2>
            <div className="flex flex-wrap gap-4">
              {language.websiteUrl && (
                <a
                  href={language.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-green-400 text-black font-bold border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Site officiel
                </a>
              )}
              {language.githubUrl && (
                <a
                  href={language.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-purple-400 text-black font-bold border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
