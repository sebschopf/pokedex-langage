"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function SeedTodosButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSeedTodos = async () => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/seed-user-todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Une erreur est survenue")
      }

      toast({
        title: "Tâches créées",
        description: "Des tâches d'exemple ont été créées pour votre compte.",
      })

      // Rafraîchir la page
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSeedTodos} disabled={isLoading} variant="outline">
      {isLoading ? "Création en cours..." : "Créer des tâches d'exemple"}
    </Button>
  )
}
