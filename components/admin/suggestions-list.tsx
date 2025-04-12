"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"

interface Suggestion {
  id: number
  language_id: number | null
  field: string
  correction_text: string
  framework: string | null
  status: string
  created_at: string
  suggestion?: string
  languages?: {
    name: string
  }
}

interface SuggestionsListProps {
  suggestions: Suggestion[]
  userRole: string
}

export function SuggestionsList({ suggestions, userRole }: SuggestionsListProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending")
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(suggestions)
  const [isProcessing, setIsProcessing] = useState<Record<number, boolean>>({})
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()
  const { insert, update } = useSupabaseMutation()

  // Filtrer les suggestions en fonction de l'onglet actif
  const handleTabChange = (value: string) => {
    setActiveTab(value as "pending" | "all")

    if (value === "pending") {
      setFilteredSuggestions(suggestions.filter((s) => s.status === "pending"))
    } else {
      setFilteredSuggestions(suggestions)
    }
  }

  // Approuver une suggestion
  const approveSuggestion = async (suggestion: Suggestion) => {
    setIsProcessing({ ...isProcessing, [suggestion.id]: true })

    try {
      await withTokenRefresh(async () => {
        if (suggestion.field === "new_language" && !suggestion.language_id) {
          // C'est une suggestion de nouveau langage
          if (suggestion.suggestion) {
            const languageData = JSON.parse(suggestion.suggestion)

            // Créer le nouveau langage
            await insert({
              table: "languages",
              data: {
                name: languageData.name,
                slug: languageData.name.toLowerCase().replace(/\s+/g, "-"),
                year_created: languageData.year_created,
                creator: languageData.creator,
                short_description: languageData.short_description,
                description: languageData.description,
                type: languageData.type,
                used_for: languageData.used_for,
                is_open_source: languageData.is_open_source,
              },
              errorMessage: "Erreur lors de la création du nouveau langage",
              showToast: false,
            })
          }
        } else if (suggestion.language_id) {
          // C'est une correction pour un langage existant
          await update({
            table: "languages",
            data: { [suggestion.field]: suggestion.correction_text },
            match: { id: suggestion.language_id },
            errorMessage: "Erreur lors de la mise à jour du langage",
            showToast: false,
          })
        }

        // Mettre à jour le statut de la suggestion
        await update({
          table: "corrections",
          data: { status: "approved" },
          match: { id: suggestion.id },
          successMessage: "Suggestion approuvée et modifications appliquées.",
          errorMessage: "Un problème est survenu lors de l'approbation de la suggestion.",
          onSuccess: () => {
            setFilteredSuggestions(filteredSuggestions.filter((s) => s.id !== suggestion.id))
          },
        })
      })
    } catch (error) {
      console.error("Erreur lors de l'approbation de la suggestion:", error)
    } finally {
      setIsProcessing({ ...isProcessing, [suggestion.id]: false })
    }
  }

  // Rejeter une suggestion
  const rejectSuggestion = async (suggestion: Suggestion) => {
    setIsProcessing({ ...isProcessing, [suggestion.id]: true })

    try {
      await withTokenRefresh(async () => {
        await update({
          table: "corrections",
          data: { status: "rejected" },
          match: { id: suggestion.id },
          successMessage: "Suggestion rejetée.",
          errorMessage: "Un problème est survenu lors du rejet de la suggestion.",
          onSuccess: () => {
            setFilteredSuggestions(filteredSuggestions.filter((s) => s.id !== suggestion.id))
          },
        })
      })
    } catch (error) {
      console.error("Erreur lors du rejet de la suggestion:", error)
    } finally {
      setIsProcessing({ ...isProcessing, [suggestion.id]: false })
    }
  }

  // Afficher les détails d'une suggestion
  const viewSuggestionDetails = (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion)
    setIsDialogOpen(true)
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div>
      <Tabs defaultValue="pending" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="all">Toutes les suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {filteredSuggestions.length === 0 ? (
            <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-lg text-gray-500 dark:text-gray-400">Aucune suggestion en attente.</p>
            </div>
          ) : (
            filteredSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {suggestion.field === "new_language"
                          ? "Nouveau langage"
                          : `Correction pour ${suggestion.languages?.name || "un langage"}`}
                      </CardTitle>
                      <CardDescription>
                        {suggestion.field === "new_language"
                          ? "Suggestion d'ajout d'un nouveau langage"
                          : `Champ: ${suggestion.field}${suggestion.framework ? ` (Framework: ${suggestion.framework})` : ""}`}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        suggestion.status === "pending"
                          ? "outline"
                          : suggestion.status === "approved"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {suggestion.status === "pending"
                        ? "En attente"
                        : suggestion.status === "approved"
                          ? "Approuvée"
                          : "Rejetée"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Suggestion:</h4>
                    <p className="whitespace-pre-wrap">
                      {suggestion.correction_text.length > 150
                        ? `${suggestion.correction_text.substring(0, 150)}...`
                        : suggestion.correction_text}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Soumis le {formatDate(suggestion.created_at)}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-800 flex justify-between">
                  <Button variant="outline" onClick={() => viewSuggestionDetails(suggestion)}>
                    Voir les détails
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="destructive"
                      onClick={() => rejectSuggestion(suggestion)}
                      disabled={isProcessing[suggestion.id]}
                    >
                      Rejeter
                    </Button>
                    <Button onClick={() => approveSuggestion(suggestion)} disabled={isProcessing[suggestion.id]}>
                      Approuver
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {/* Contenu similaire pour toutes les suggestions */}
        </TabsContent>
      </Tabs>

      {/* Dialogue pour afficher les détails d'une suggestion */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedSuggestion && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedSuggestion.field === "new_language"
                    ? "Nouveau langage"
                    : `Correction pour ${selectedSuggestion.languages?.name || "un langage"}`}
                </DialogTitle>
                <DialogDescription>
                  {selectedSuggestion.field === "new_language"
                    ? "Suggestion d'ajout d'un nouveau langage"
                    : `Champ: ${selectedSuggestion.field}${selectedSuggestion.framework ? ` (Framework: ${selectedSuggestion.framework})` : ""}`}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Suggestion complète:</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap">
                    {selectedSuggestion.correction_text}
                  </div>
                </div>

                {selectedSuggestion.suggestion && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Données du nouveau langage:
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(JSON.parse(selectedSuggestion.suggestion), null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Soumis le {formatDate(selectedSuggestion.created_at)}
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Fermer
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      rejectSuggestion(selectedSuggestion)
                      setIsDialogOpen(false)
                    }}
                    disabled={isProcessing[selectedSuggestion.id]}
                  >
                    Rejeter
                  </Button>
                  <Button
                    onClick={() => {
                      approveSuggestion(selectedSuggestion)
                      setIsDialogOpen(false)
                    }}
                    disabled={isProcessing[selectedSuggestion.id]}
                  >
                    Approuver
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
