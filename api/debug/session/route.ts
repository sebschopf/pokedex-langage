import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()
    const cookieStore = cookies()
    const allCookies = cookieStore.getAll()

    // Récupérer la session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    // Si l'utilisateur est connecté, récupérer son rôle
    let roleData = null
    let profileData = null
    if (sessionData.session) {
      try {
        const { data: userRole, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", sessionData.session.user.id)
          .single()

        if (!roleError) {
          roleData = userRole
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", sessionData.session.user.id)
          .single()

        if (!profileError) {
          profileData = profile
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error)
      }
    }

    return NextResponse.json({
      session: sessionData.session
        ? {
            user: {
              id: sessionData.session.user.id,
              email: sessionData.session.user.email,
            },
            expires_at: sessionData.session.expires_at,
          }
        : null,
      role: roleData,
      profile: profileData,
      cookies: allCookies.map((c) => ({ name: c.name, value: c.value.substring(0, 20) + "..." })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Une erreur inconnue s'est produite" },
      { status: 500 },
    )
  }
}
