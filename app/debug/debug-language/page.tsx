"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugLanguagePage() {
  const [slug, setSlug] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testLanguage = async () => {
    if (!slug) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/debug-language?slug=${encodeURIComponent(slug)}`)
      const data = await response.json()

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Débogage de récupération de langage</h1>

      <div className="flex gap-4 mb-6">
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Entrez un slug (ex: javascript, python, cobol, etc.)"
          className="flex-1"
        />
        <Button onClick={testLanguage} disabled={loading || !slug}>
          {loading ? "Chargement..." : "Tester"}
        </Button>
      </div>

      {error && <div className="bg-red-100 border-2 border-red-400 text-red-700 p-4 mb-6 rounded">{error}</div>}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test de connexion à Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              {result.connectionTest?.success ? (
                <div>
                  <p className="text-green-600 font-bold mb-2">Connexion réussie !</p>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                    {JSON.stringify(result.connectionTest.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <p className="text-red-600 font-bold mb-2">Erreur de connexion</p>
                  <p>{result.connectionTest?.error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requête directe Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              {result.directQuery?.success ? (
                <div>
                  <p className="text-green-600 font-bold mb-2">Langage trouvé !</p>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                    {JSON.stringify(result.directQuery.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <p className="text-red-600 font-bold mb-2">Langage non trouvé</p>
                  <p>{result.directQuery?.error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résultat de getLanguageBySlug</CardTitle>
            </CardHeader>
            <CardContent>
              {result.functionResult?.success ? (
                <div>
                  <p className="text-green-600 font-bold mb-2">Langage trouvé !</p>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                    {JSON.stringify(result.functionResult.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <p className="text-red-600 font-bold mb-2">Langage non trouvé</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tous les slugs disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              {result.allSlugs?.success ? (
                <div>
                  <p className="text-green-600 font-bold mb-2">Slugs récupérés avec succès !</p>
                  <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Nom</th>
                          <th className="text-left">Slug</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.allSlugs.data.map((item: any, index: number) => (
                          <tr key={index} className="border-t">
                            <td className="py-2">{item.name}</td>
                            <td className="py-2">{item.slug}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-red-600 font-bold mb-2">Erreur lors de la récupération des slugs</p>
                  <p>{result.allSlugs?.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
