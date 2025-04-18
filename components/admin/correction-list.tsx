"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Correction } from "@/types/models/correction"
import { approveCorrection, rejectCorrection } from "@/app/actions/correction-actions"

interface CorrectionListProps {
  corrections: Correction[]
  showApproveReject?: boolean
  approveAction?: (formData: FormData) => Promise<any>
  rejectAction?: (formData: FormData) => Promise<any>
}

export function CorrectionList({
  corrections,
  showApproveReject = false,
  approveAction = approveCorrection,
  rejectAction = rejectCorrection,
}: CorrectionListProps) {
  const [selectedCorrection, setSelectedCorrection] = useState<Correction | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionResult, setActionResult] = useState<{ success: boolean; message: string } | null>(null)

  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Fonction pour gérer l'approbation d'une correction
  const handleApprove = async () => {
    if (!selectedCorrection) return

    setIsSubmitting(true)
    setActionResult(null)

    try {
      const formData = new FormData()
      formData.append("id", String(selectedCorrection.id))

      const result = await approveAction(formData)

      setActionResult({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Mettre à jour la liste des corrections
        const updatedCorrection = { ...selectedCorrection, status: "approved" }
        setSelectedCorrection(updatedCorrection)
      }
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error)
      setActionResult({
        success: false,
        message: "Une erreur est survenue lors de l'approbation",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour gérer le rejet d'une correction
  const handleReject = async () => {
    if (!selectedCorrection) return

    setIsSubmitting(true)
    setActionResult(null)

    try {
      const formData = new FormData()
      formData.append("id", String(selectedCorrection.id))

      const result = await rejectAction(formData)

      setActionResult({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        // Mettre à jour la liste des corrections
        const updatedCorrection = { ...selectedCorrection, status: "rejected" }
        setSelectedCorrection(updatedCorrection)
      }
    } catch (error) {
      console.error("Erreur lors du rejet:", error)
      setActionResult({
        success: false,
        message: "Une erreur est survenue lors du rejet",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Liste des corrections ({corrections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {corrections.length === 0 ? (
              <p className="text-center py-4 text-gray-500">Aucune correction trouvée</p>
            ) : (
              <ul className="divide-y">
                {corrections.map((correction) => (
                  <li
                    key={correction.id}
                    className={`py-3 px-2 cursor-pointer hover:bg-gray-50 rounded ${
                      selectedCorrection?.id === correction.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedCorrection(correction)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium truncate">{correction.correctionText.substring(0, 100)}...</p>
                        <p className="text-sm text-gray-500">
                          Langage ID: {correction.languageId} •{" "}
                          {correction.createdAt ? new Date(correction.createdAt).toLocaleDateString() : "Date inconnue"}
                        </p>
                      </div>
                      <Badge className={getStatusColor(correction.status)}>{correction.status}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Détails de la correction</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCorrection ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ID</h3>
                  <p>{selectedCorrection.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Langage ID</h3>
                  <p>{selectedCorrection.languageId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Texte de correction</h3>
                  <p className="whitespace-pre-wrap">{selectedCorrection.correctionText}</p>
                </div>
                {selectedCorrection.suggestion && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Suggestion</h3>
                    <p className="whitespace-pre-wrap">{selectedCorrection.suggestion}</p>
                  </div>
                )}
                {selectedCorrection.field && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Champ</h3>
                    <p>{selectedCorrection.field}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Statut</h3>
                  <Badge className={getStatusColor(selectedCorrection.status)}>{selectedCorrection.status}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date de création</h3>
                  <p>
                    {selectedCorrection.createdAt
                      ? new Date(selectedCorrection.createdAt).toLocaleString()
                      : "Date inconnue"}
                  </p>
                </div>

                {showApproveReject && selectedCorrection.status === "pending" && (
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" onClick={handleApprove} disabled={isSubmitting}>
                      {isSubmitting ? "En cours..." : "Approuver"}
                    </Button>
                    <Button variant="outline" onClick={handleReject} disabled={isSubmitting}>
                      {isSubmitting ? "En cours..." : "Rejeter"}
                    </Button>
                  </div>
                )}

                {actionResult && (
                  <div className={`mt-4 p-2 rounded ${actionResult.success ? "bg-green-100" : "bg-red-100"}`}>
                    {actionResult.message}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">Sélectionnez une correction pour voir les détails</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
