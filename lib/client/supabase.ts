import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Singleton pour le client Supabase côté client
let clientSupabaseClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée ou récupère une instance du client Supabase pour le client
 * @returns Client Supabase
 */
export function createClientSupabaseClient() {
  if (clientSupabaseClient) return clientSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variables d'environnement Supabase manquantes")
    throw new Error("Variables d'environnement Supabase manquantes")
  }

  clientSupabaseClient = createClient<Database>(supabaseUrl, supabaseKey)

  return clientSupabaseClient
}
