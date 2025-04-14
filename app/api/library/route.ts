import { type NextRequest, NextResponse } from "next/server"
import { getLibraries, createLibrary } from "@/lib/server/api/libraries"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const languageId = searchParams.get("languageId")

    let libraries = []

    if (languageId) {
      libraries = await getLibraries({ languageId: Number(languageId) })
    } else {
      libraries = await getLibraries()
    }

    return NextResponse.json(libraries)
  } catch (error) {
    console.error("Erreur lors de la récupération des bibliothèques:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
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
    const { languageId, ...libraryData } = data

    if (!languageId) {
      return NextResponse.json({ error: "ID de langage requis" }, { status: 400 })
    }

    const newLibrary = await createLibrary(libraryData, languageId)

    if (!newLibrary) {
      return NextResponse.json({ error: "Erreur lors de la création de la bibliothèque" }, { status: 500 })
    }

    return NextResponse.json(newLibrary, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
