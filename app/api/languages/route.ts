import { type NextRequest, NextResponse } from "next/server"
import { getLanguages, createLanguage } from "@/lib/server/api/languages"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"

export async function GET() {
  try {
    const languages = await getLanguages()
    return NextResponse.json(languages)
  } catch (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la récupération des langages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification et les autorisations
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier le rôle de l'utilisateur (admin ou éditeur)
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    if (!roleData || !["admin", "editor"].includes(roleData.role)) {
      return NextResponse.json({ error: "Permissions insuffisantes" }, { status: 403 })
    }

    const data = await request.json()
    const newLanguage = await createLanguage(data)

    if (!newLanguage) {
      return NextResponse.json({ error: "Erreur lors de la création du langage" }, { status: 500 })
    }

    return NextResponse.json(newLanguage, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création du langage:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la création du langage" }, { status: 500 })
  }
}
