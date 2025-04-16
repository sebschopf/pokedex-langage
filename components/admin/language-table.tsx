"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Search, Eye } from "lucide-react"
import { deleteLanguageAction } from "@/app/actions/language-actions"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface LanguageWithStats {
  id: number
  name: string
  slug: string
  type: string | null
  shortDescription: string | null
  yearCreated: number | null
  isOpenSource: boolean | null
  logoPath: string | null
  createdAt: string | null
  updatedAt: string | null
  frameworksCount?: number
  librariesCount?: number
  correctionsCount?: number
}

interface LanguageTableProps {
  languages: LanguageWithStats[]
  formatDate: (date: string) => string
}

export function LanguageTable({ languages, formatDate }: LanguageTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleting, setIsDeleting] = useState<Record<number, boolean>>({})
  const { toast } = useToast()
  const router = useRouter()

  // Filtrer les langages en fonction du terme de recherche
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      language.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      language.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Gérer la suppression d'un langage
  const handleDelete = async (id: number, name: string, logoUrl?: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le langage "${name}" ?`)) {
      setIsDeleting((prev) => ({ ...prev, [id]: true }))

      try {
        const result = await deleteLanguageAction(String(id), logoUrl || undefined)

        if (result.success) {
          toast({
            title: "Langage supprimé",
            description: `Le langage "${name}" a été supprimé avec succès.`,
          })
          router.refresh()
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description: result.message || "Une erreur est survenue lors de la suppression du langage.",
          })
        }
      } catch (error) {
        console.error("Erreur lors de la suppression du langage:", error)
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression du langage.",
        })
      } finally {
        setIsDeleting((prev) => ({ ...prev, [id]: false }))
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          placeholder="Rechercher un langage..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Langage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Année
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frameworks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bibliothèques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière mise à jour
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language) => (
                  <tr key={language.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {language.logoPath && (
                          <img
                            src={language.logoPath || "/placeholder.svg"}
                            alt={`Logo ${language.name}`}
                            className="h-10 w-10 mr-3 object-contain"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{language.name}</div>
                          <div className="text-sm text-gray-500">{language.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{language.type || "Non spécifié"}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language.yearCreated || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language.frameworksCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language.librariesCount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language.updatedAt ? formatDate(language.updatedAt) : "Jamais"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/languages/${language.slug}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/languages/${language.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(language.id, language.name, language.logoPath || undefined)}
                          disabled={isDeleting[language.id]}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm ? "Aucun langage ne correspond à votre recherche." : "Aucun langage trouvé."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
