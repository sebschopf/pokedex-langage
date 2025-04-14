// Ce fichier ne doit être importé que dans les Server Components de l'App Router
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "./database-types"
import { cache } from "react"

// Client pour les Server Components de l'App Router
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
