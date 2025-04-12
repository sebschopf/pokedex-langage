import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"
import { cache } from "react"

/**
 * Crée ou récupère une instance du client Supabase pour le serveur
 * Utilise React cache pour garantir une seule instance par requête
 * @returns Client Supabase
 */
export const createServerSupabaseClient = cache(() => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] Création du client Supabase serveur...`)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    const missingVars = []
    if (!supabaseUrl) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!supabaseKey) missingVars.push("SUPABASE_SERVICE_ROLE_KEY")

    const errorMsg = `Variables d'environnement Supabase manquantes: ${missingVars.join(", ")}`
    console.error(`[${timestamp}] ${errorMsg}`)
    throw new Error(errorMsg)
  }

  console.log(`[${timestamp}] Variables d'environnement Supabase vérifiées, création du client...`)

  try {
    const client = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })

    console.log(`[${timestamp}] Client Supabase créé avec succès`)
    return client
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"
    console.error(`[${timestamp}] Erreur lors de la création du client Supabase:`, errorMessage)
    throw error
  }
})

/**
 * Crée un client Supabase pour les composants serveur avec cookies
 * @returns Client Supabase
 */
export const createServerComponentSupabaseClient = cache(() => {
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
})

/**
 * Crée un client Supabase avec les droits d'administrateur
 * @returns Client Supabase avec droits admin
 */
export const createAdminSupabaseClient = cache(() => {
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
})
