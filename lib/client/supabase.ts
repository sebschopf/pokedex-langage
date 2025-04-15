import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

export function createClientSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variables d'environnement Supabase côté client manquantes")
    throw new Error("Variables d'environnement Supabase côté client manquantes")
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storageKey: "supabase-auth",
    },
  })

  return supabaseClient
}
