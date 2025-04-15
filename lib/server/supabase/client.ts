import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database-types"
import { cache } from "react"

// Variable pour stocker l'instance singleton
let supabaseServerClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée ou récupère une instance du client Supabase pour le serveur
 * @returns Client Supabase pour les opérations serveur
 */
export const createServerSupabaseClient = cache(() => {
  if (supabaseServerClient) {
    return supabaseServerClient
  }

  console.log("[Supabase] Création du client Supabase serveur...")

  // Essayer différentes variables d'environnement possibles
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("[Supabase] Variables d'environnement Supabase manquantes")
    console.error(
      "[Supabase] Variables disponibles:",
      Object.keys(process.env).filter((key) => key.includes("SUPABASE")),
    )
    throw new Error("Variables d'environnement Supabase manquantes")
  }

  console.log("[Supabase] Variables d'environnement Supabase vérifiées, création du client...")

  supabaseServerClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })

  console.log("[Supabase] Client Supabase créé avec succès")
  return supabaseServerClient
})

/**
 * Crée ou récupère une instance du client Supabase avec des droits administratifs
 * Cette fonction est mise en cache pour éviter de créer plusieurs instances
 * @returns Client Supabase pour les opérations administratives
 */
export const createAdminSupabaseClient = cache(() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Variables d'environnement Supabase manquantes: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
    )
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
})
