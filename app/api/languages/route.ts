import { NextResponse } from "next/server"
import { deleteLanguage, getLanguageById } from "@/lib/server/api/languages"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const language = await getLanguageById(Number(params.id))

    if (!language) {
      return NextResponse.json({ error: "Langage non trouvé" }, { status: 404 })
    }

    return NextResponse.json(language)
  } catch (error) {
    console.error("Erreur lors de la récupération du langage:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifier l'authentification et les autorisations
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier le rôle de l'utilisateur (admin uniquement)
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    if (!roleData || roleData.role !== "admin") {
      return NextResponse.json({ error: "Permissions insuffisantes" }, { status: 403 })
    }

    const success = await deleteLanguage(Number(params.id))

    if (!success) {
      return NextResponse.json({ error: "Erreur lors de la suppression du langage" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression du langage:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
