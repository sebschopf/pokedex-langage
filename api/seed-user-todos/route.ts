import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Database } from "@/lib/database-types"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour effectuer cette action" }, { status: 401 })
    }

    // Appeler la fonction SQL pour créer des tâches pour l'utilisateur
    const { error } = await supabase.rpc("create_user_todos", {
      user_uuid: session.user.id,
    })

    if (error) {
      console.error("Erreur lors de la création des tâches:", error)
      return NextResponse.json({ error: "Erreur lors de la création des tâches" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
