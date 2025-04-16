import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Singleton pattern pour éviter de créer plusieurs instances du client
let browserClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée un client Supabase côté navigateur (singleton)
 * À utiliser uniquement dans les composants client
 */
export function createBrowserClient() {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Les variables d'environnement NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont requises",
    )
  }

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "supabase-auth",
    },
  })

  return browserClient
}
