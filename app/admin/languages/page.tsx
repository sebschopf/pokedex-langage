"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Trash, Edit, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getLanguages, deleteLanguage } from "@/lib/data"
import type { Language } from "@/types/models"
import { getImageName } from "@/utils/image"
import { getTypeBadgeColor } from "@/utils/theme"
import LanguageImage from "@/components/language-image"

export default function LanguagesAdminPage() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [languageToDelete, setLanguageToDelete] = useState<Language | null>(null)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function loadLanguages() {
      try {
        const data = await getLanguages()
        setLanguages(data || [])
      } catch (error) {
        console.error("Erreur lors du chargement des langages:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les langages. Veuillez réessayer.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadLanguages()
  }, [toast])

  const handleDeleteClick = (language: Language) => {
    setLanguageToDelete(language)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!languageToDelete) return

    setDeleting(true)
    try {
      // Convertir l'ID en nombre pour la fonction deleteLanguage
      const success = await deleteLanguage(Number(languageToDelete.id))
      if (success) {
        setLanguages(languages.filter((lang) => lang.id !== languageToDelete.id))
        toast({
          title: "Langage supprimé",
          description: `Le langage ${languageToDelete.name} a été supprimé avec succès.`,
        })
      } else {
        throw new Error("Échec de la suppression")
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du langage:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le langage. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
      setDeleteDialogOpen(false)
      setLanguageToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Langages</h1>
        <Button onClick={() => router.push("/admin/languages/new")} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un langage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map((language) => (
          <Card key={language.id} className="border-4 border-black overflow-hidden">
            <CardHeader className="border-b-4 border-black p-4 flex flex-row items-center gap-4">
              <div className="w-12 h-12 relative">
                <LanguageImage
                  src={language.logoPath || `/images/languages/${getImageName(language.name)}.svg`}
                  alt={language.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${getTypeBadgeColor(language.type)} text-white text-xs font-bold px-2 py-0.5`}>
                    {language.type || "Autre"}
                  </div>
                  {language.isOpenSource ? (
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-0.5">Open Source</div>
                  ) : (
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-0.5">Propriétaire</div>
                  )}
                </div>
                <CardTitle className="text-xl">{language.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <p className="text-sm line-clamp-2">{language.shortDescription || "Aucune description disponible"}</p>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black"
                  onClick={() => router.push(`/admin/languages/edit/${language.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black text-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteClick(language)}
                >
                  <Trash className="mr-2 h-4 w-4" /> Supprimer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-black"
                  onClick={() => router.push(`/language/${language.slug}`)}
                >
                  <Eye className="mr-2 h-4 w-4" /> Voir
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  Année de création :{" "}
                  {language.yearCreated ||
                    (language.createdAt ? new Date(language.createdAt).getFullYear() : "Inconnue")}
                </p>
                <p>
                  Dernière mise à jour :{" "}
                  {language.updatedAt ? new Date(language.updatedAt).toLocaleDateString() : "Jamais"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {languages.length === 0 && (
        <div className="text-center p-8 border-4 border-black bg-gray-50">
          <p className="text-lg font-bold">Aucun langage trouvé</p>
          <p className="mt-2">Commencez par ajouter un nouveau langage de programmation.</p>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="border-4 border-black">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Êtes-vous sûr de vouloir supprimer le langage <span className="font-bold">{languageToDelete?.name}</span>{" "}
              ?
            </p>
            <p className="mt-2 text-red-600">Cette action est irréversible.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash className="h-4 w-4 mr-2" />}
              {deleting ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
