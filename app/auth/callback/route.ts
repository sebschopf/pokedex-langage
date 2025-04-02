import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { Database } from "@/lib/database-types"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)

    // Vérifier le rôle de l'utilisateur pour rediriger vers le bon dashboard
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

      if (userRole && (userRole.role === "admin" || userRole.role === "validator")) {
        return NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`)
      } else {
        return NextResponse.redirect(`${requestUrl.origin}/profile`)
      }
    }
  }

  // Redirection par défaut
  return NextResponse.redirect(`${requestUrl.origin}`)
}

