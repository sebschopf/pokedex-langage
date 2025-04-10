import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database-types"

// Singleton pour le client côté serveur (uniquement en développement)
let supabaseServerInstance: SupabaseClient<Database> | null = null

/**
 * Client pour les Server Components
 */
export const createServerComponentSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

/**
 * Crée ou retourne une instance singleton du client Supabase côté serveur
 */
export const createServerSupabaseClient = () => {
  // Ne pas réutiliser l'instance côté serveur en production pour éviter les fuites de mémoire
  if (process.env.NODE_ENV !== "production" && supabaseServerInstance) {
    return supabaseServerInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  // Créer une nouvelle instance
  const client = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false, // Important pour le côté serveur
    },
  })

  // En développement, stocker l'instance pour la réutiliser
  if (process.env.NODE_ENV !== "production") {
    supabaseServerInstance = client
  }

  return client
}

/**
 * Client avec les droits d'administration
 */
export const createAdminSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}
