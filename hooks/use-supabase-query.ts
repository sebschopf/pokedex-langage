"use client"

import { useState, useEffect } from "react"
import { createSupabaseClient } from "@/lib/supabase"
import { useToast } from "./use-toast"
import { useIsMobile } from "./use-mobile"

// Options pour la requête
interface QueryOptions<T> {
  table: string
  columns?: string
  filter?: Record<string, any>
  order?: { column: string; ascending?: boolean }
  limit?: number
  single?: boolean
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  errorMessage?: string
  showToast?: boolean
}

// Hook pour les requêtes Supabase avec gestion des toasts et optimisations mobiles
export function useSupabaseQuery<T = any>({
  table,
  columns = "*",
  filter,
  order,
  limit,
  single = false,
  enabled = true,
  onSuccess,
  onError,
  errorMessage,
  showToast = true,
}: QueryOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(enabled)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  // Fonction pour exécuter la requête
  const fetchData = async () => {
    if (!enabled) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      let query = supabase.from(table).select(columns)

      // Appliquer les filtres
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      // Appliquer le tri
      if (order) {
        query = query.order(order.column, { ascending: order.ascending })
      }

      // Limiter le nombre de résultats
      if (limit) {
        query = query.limit(limit)
      }

      // Récupérer un seul résultat ou plusieurs
      const { data: result, error } = single ? await query.single() : await query

      if (error) throw error

      setData(result as unknown as T)

      if (onSuccess) onSuccess(result as unknown as T)

      return result
    } catch (err) {
      const error = err as Error
      setError(error)

      if (showToast) {
        toast({
          title: "Erreur",
          description: errorMessage || error.message,
          variant: "destructive",
        })
      }

      if (onError) onError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Exécuter la requête au chargement du composant
  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [enabled, table, columns, JSON.stringify(filter), JSON.stringify(order), limit, single])

  // Optimisation pour les appareils mobiles
  useEffect(() => {
    if (isMobile && limit && !single && Array.isArray(data) && data.length > 10) {
      // Limiter le nombre de résultats sur mobile pour améliorer les performances
      setData(data.slice(0, 10) as unknown as T)
    }
  }, [isMobile, data, limit, single])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}

