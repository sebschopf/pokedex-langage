import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Database } from "@/lib/database-types"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    try {
      // Échanger le code contre une session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Erreur lors de l'échange du code:", error)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`)
      }

      // Vérifier le rôle de l'utilisateur pour rediriger vers le bon dashboard
      if (data.session) {
        const userId = data.session.user.id

        // Vérifier le rôle de l'utilisateur
        const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", userId).single()

        if (userRole && (userRole.role === "admin" || userRole.role === "validator")) {
          return NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`)
        }
      }

      // Redirection par défaut
      return NextResponse.redirect(`${requestUrl.origin}${redirectTo}`)
    } catch (error) {
      console.error("Erreur lors du traitement du callback:", error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=Erreur+de+traitement`)
    }
  }

  // Redirection par défaut si pas de code
  return NextResponse.redirect(`${requestUrl.origin}`)
}
