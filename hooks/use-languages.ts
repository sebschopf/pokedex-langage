"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/types/models"

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/languages")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des langages")
        }
        const data = await response.json()
        setLanguages(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erreur inconnue"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  return { languages, isLoading, error }
}
