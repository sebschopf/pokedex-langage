import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"
import { cache } from "react"

// Variable globale pour stocker l'instance du client
let globalSupabaseClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée ou récupère une instance du client Supabase pour le serveur
 * Utilise une variable globale pour garantir une seule instance par serveur
 * @returns Client Supabase
 */
export const createServerSupabaseClient = cache(() => {
  // Si le client existe déjà, le retourner
  if (globalSupabaseClient) {
    return globalSupabaseClient
  }

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
    globalSupabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })

    console.log(`[${timestamp}] Client Supabase créé avec succès`)
    return globalSupabaseClient
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue"
    console.error(`[${timestamp}] Erreur lors de la création du client Supabase:`, errorMessage)
    throw error
  }
})

// Même approche pour les autres clients
let globalComponentClient: ReturnType<typeof createClient<Database>> | null = null

export const createServerComponentSupabaseClient = cache(() => {
  if (globalComponentClient) {
    return globalComponentClient
  }

  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  globalComponentClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  })

  return globalComponentClient
})

// Même approche pour le client admin
let globalAdminClient: ReturnType<typeof createClient<Database>> | null = null

export const createAdminSupabaseClient = cache(() => {
  if (globalAdminClient) {
    return globalAdminClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies")
  }

  globalAdminClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })

  return globalAdminClient
})
