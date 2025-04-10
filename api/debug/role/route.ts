import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { debugUserRole } from "@/lib/debug-auth"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    // Utiliser la fonction de débogage pour obtenir des informations détaillées
    const debugInfo = await debugUserRole(session.user.id)

    return NextResponse.json({
      user: session.user,
      debugInfo,
      cookies: cookieStore.getAll().map((c) => ({ name: c.name })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite" },
      { status: 500 },
    )
  }
}
