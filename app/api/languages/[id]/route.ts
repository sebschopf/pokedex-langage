import { type NextRequest, NextResponse } from "next/server"
import { getLanguageById, updateLanguage, deleteLanguage } from "@/lib/server/api/languages"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const language = await getLanguageById(id)
    if (!language) {
      return NextResponse.json({ error: "Langage non trouvé" }, { status: 404 })
    }

    return NextResponse.json(language)
  } catch (error) {
    console.error("Erreur lors de la récupération du langage:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la récupération du langage" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const id = Number.parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const data = await request.json()
    const success = await updateLanguage(id, data)

    if (!success) {
      return NextResponse.json({ error: "Erreur lors de la mise à jour du langage" }, { status: 500 })
    }

    // Récupérer le langage mis à jour
    const updatedLanguage = await getLanguageById(id)
    return NextResponse.json(updatedLanguage)
  } catch (error) {
    console.error("Erreur lors de la mise à jour du langage:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la mise à jour du langage" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Vérifier l'authentification et les autorisations (admin uniquement)
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

    const id = Number.parseInt(params.id, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const success = await deleteLanguage(id)

    if (!success) {
      return NextResponse.json({ error: "Erreur lors de la suppression du langage" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la suppression du langage:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la suppression du langage" }, { status: 500 })
  }
}
