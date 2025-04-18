"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { Database } from "@/types/database-types"

// Type pour les noms de tables valides
type TableName = keyof Database["public"]["Tables"]

// Types pour les événements de changement
type ChangeEvent = "INSERT" | "UPDATE" | "DELETE" | "*"

// Options pour useSupabaseSubscription
interface UseSupabaseSubscriptionOptions {
  table: TableName
  event?: ChangeEvent
  filters?: Record<string, any>
  callback?: (payload: any) => void
}

// Hook useSupabaseSubscription
export function useSupabaseSubscription({
  table,
  event = "*",
  filters = {},
  callback,
}: UseSupabaseSubscriptionOptions) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient()

    // Créer le canal avec un nom unique basé sur la table
    const channelName = `table-changes-${table}-${Date.now()}`

    try {
      // Utiliser any pour contourner les problèmes de typage
      const channel = supabase.channel(channelName) as any

      // Maintenant que channel est typé comme any, TypeScript ne vérifiera plus les appels de méthode
      channel.on(
        "postgres_changes",
        {
          event,
          schema: "public",
          table,
          ...filters,
        },
        (payload: any) => {
          if (callback) {
            callback(payload)
          }
        },
      )

      // S'abonner au canal
      channel.subscribe((status: string) => {
        if (status === "SUBSCRIBED") {
          setIsSubscribed(true)
          setError(null)
        } else {
          setIsSubscribed(false)
        }
      })

      // Nettoyer la souscription
      return () => {
        try {
          supabase.removeChannel(channel)
        } catch (err) {
          console.error("Erreur lors de la suppression du canal:", err)
        }
      }
    } catch (err) {
      console.error("Erreur lors de la configuration du canal:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
      // Retourner une fonction de nettoyage vide en cas d'erreur
      return () => {}
    }
  }, [table, event, JSON.stringify(filters), callback])

  return { isSubscribed, error }
}
