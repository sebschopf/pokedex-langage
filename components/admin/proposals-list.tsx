"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { withTokenRefresh } from "@/lib/client/auth-helpers"

interface Proposal {
  id: string
  name: string
  type: string
  description: string
  created_year?: number
  creator?: string
  used_for?: string
  status: string
  created_at: string
  user_id: string
}

interface ProposalsListProps {
  proposals: Proposal[]
}

export function ProposalsList({ proposals }: ProposalsListProps) {
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const { toast } = useToast()

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setIsProcessing((prev) => ({ ...prev, [id]: true }))

    try {
      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        const response = await fetch(`/api/proposals/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour")
        }

        toast({
          title: status === "approved" ? "Proposition approuvée" : "Proposition rejetée",
          description:
            status === "approved"
              ? "La proposition a été approuvée et le langage sera ajouté."
              : "La proposition a été rejetée.",
        })

        // Refresh the page
        router.refresh()
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing((prev) => ({ ...prev, [id]: false }))
    }
  }

  if (proposals.length === 0) {
    return <p className="text-muted-foreground">Aucune proposition en attente.</p>
  }

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">
                {proposal.name} <span className="text-sm font-normal">({proposal.type})</span>
              </CardTitle>
              <Badge
                className={
                  proposal.status === "pending"
                    ? "bg-yellow-500"
                    : proposal.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                }
              >
                {proposal.status === "pending"
                  ? "En attente"
                  : proposal.status === "approved"
                    ? "Approuvée"
                    : "Rejetée"}
              </Badge>
            </div>
            {proposal.created_year && (
              <p className="text-sm text-muted-foreground">
                Créé en {proposal.created_year} {proposal.creator ? `par ${proposal.creator}` : ""}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-2">Description:</p>
            <p>{proposal.description}</p>

            {proposal.used_for && (
              <>
                <p className="font-medium mt-4 mb-2">Utilisations:</p>
                <p>{proposal.used_for}</p>
              </>
            )}
          </CardContent>
          {proposal.status === "pending" && (
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateStatus(proposal.id, "rejected")}
                disabled={isProcessing[proposal.id]}
              >
                Rejeter
              </Button>
              <Button
                size="sm"
                onClick={() => updateStatus(proposal.id, "approved")}
                disabled={isProcessing[proposal.id]}
              >
                Approuver
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
