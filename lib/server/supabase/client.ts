import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Singleton pour le client Supabase côté serveur
let serverSupabaseClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée ou récupère une instance du client Supabase pour le serveur
 * @returns Client Supabase
 */
export function createServerSupabaseClient() {
  if (serverSupabaseClient) return serverSupabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Variables d'environnement Supabase manquantes")
    throw new Error("Variables d'environnement Supabase manquantes")
  }

  serverSupabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })

  return serverSupabaseClient
}

/**
 * Crée un client Supabase pour les composants serveur avec cookies
 * @returns Client Supabase
 */
export function createServerComponentSupabaseClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  })
}

/**
 * Crée un client Supabase avec les droits d'administrateur
 * @returns Client Supabase avec droits admin
 */
export function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}
