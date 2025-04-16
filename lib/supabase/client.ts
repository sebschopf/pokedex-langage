'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database-types'

// Singleton pour éviter de créer plusieurs instances
let browserClient: ReturnType<typeof createClient<Database>> | null = null

/**
 * Crée un client Supabase pour une utilisation côté client (navigateur)
 * À utiliser dans les Client Components (avec 'use client')
 */
export function createBrowserClient() {
  if (browserClient) return browserClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variables d\'environnement Supabase manquantes')
  }

  browserClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      storageKey: 'supabase-auth',
    }
  })

  return browserClient
}