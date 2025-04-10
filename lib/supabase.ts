import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./database-types"

// Singleton pour le client côté client
let supabaseClientInstance: SupabaseClient<Database> | null = null

/**
 * Crée ou retourne une instance singleton du client Supabase côté client
 */
export const createSupabaseClient = () => {
  // Si l'instance existe déjà, la retourner
  if (supabaseClientInstance) return supabaseClientInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  // Créer une nouvelle instance et la stocker
  supabaseClientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return supabaseClientInstance
}

/**
 * Client pour les composants React côté client
 */
export const createClientSupabaseClient = () => {
  return createClientComponentClient<Database>()
}
