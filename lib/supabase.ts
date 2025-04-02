import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database-types"

// Création d'un singleton pour le client Supabase côté client
let supabaseClient: SupabaseClient<Database> | null = null

export const createSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Client Supabase côté serveur (pour les Server Components et Server Actions)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey)
}

// Client Supabase pour les Server Components de Next.js (avec gestion automatique des cookies)
export const createServerComponentSupabaseClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

