"use client"

import { useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import type { RealtimeChannel } from "@supabase/supabase-js"

// Hook pour s'abonner aux changements en temps réel de Supabase
export function useSupabaseSubscription<T = any>(
  table: string,
  callback?: (payload: { new: T; old: T }) => void,
  filter?: { column: string; value: any },
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const supabase = createClientSupabaseClient()

    // Créer un canal pour les changements en temps réel
    const subscription = supabase.channel(`public:${table}`)

    // Configurer le filtre si nécessaire
    let query = subscription.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: table,
      },
      (payload) => {
        if (callback) {
          callback(payload.new as any)
        }
      },
    )

    // Si un filtre est fourni, l'appliquer
    if (filter) {
      query = subscription.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: `${filter.column}=eq.${filter.value}`,
        },
        (payload) => {
          if (callback) {
            callback(payload.new as any)
          }
        },
      )
    }

    // S'abonner aux changements
    subscription.subscribe((status, err) => {
      if (status !== "SUBSCRIBED") {
        setError(err || new Error(`Erreur d'abonnement: ${status}`))
      }
    })

    setChannel(subscription)

    // Nettoyer l'abonnement lors du démontage
    return () => {
      supabase.removeChannel(subscription)
    }
  }, [table, callback, filter])

  return { channel, error }
}
