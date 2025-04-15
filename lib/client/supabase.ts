import { createClient } from "@supabase/supabase-js"
// Utiliser le type Database généré
import type { Database } from "@/types/database-types"

// Singleton pour le client côté client
let supabaseClientInstance: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée ou récupère une instance du client Supabase pour le client
 * Utilise une variable globale pour garantir une seule instance par client
 * @returns Client Supabase
 */
export function createClientSupabaseClient() {
  // Si le client existe déjà, le retourner
  if (supabaseClientInstance) {
    return supabaseClientInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variables d'environnement Supabase côté client manquantes")
    throw new Error("Variables d'environnement Supabase côté client manquantes")
  }

  supabaseClientInstance = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storageKey: "supabase-auth",
    },
  })

  return supabaseClientInstance
}
