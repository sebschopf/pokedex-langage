import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database-types"

// Client Supabase avec les droits d'administration
// À utiliser uniquement côté serveur pour les opérations administratives
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

