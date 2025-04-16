import { NextResponse } from "next/server"
import { getLibraries, createLibrary } from "@/lib/server/api/libraries"
import type { Library } from "@/types/models/library"

export async function GET(request: Request) {
  try {
    // Récupérer les paramètres de requête
    const url = new URL(request.url)
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const pageSize = Number.parseInt(url.searchParams.get("pageSize") || "10")
    const search = url.searchParams.get("search") || undefined
    const languageId = url.searchParams.get("languageId")
      ? Number.parseInt(url.searchParams.get("languageId") || "0")
      : undefined
    const technologyType = url.searchParams.get("technologyType") || undefined

    // Récupérer les bibliothèques avec les options
    const result = await getLibraries({
      page,
      pageSize,
      search,
      languageId,
      technologyType,
    })

    // Retourner le résultat directement sans le traiter comme un tableau
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Erreur lors de la récupération des bibliothèques:", error)
    return NextResponse.json(
      { message: error.message || "Erreur lors de la récupération des bibliothèques" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Créer la bibliothèque
    const library = await createLibrary(body as Partial<Library>)

    // Utiliser un seul argument pour le statut 201
    return NextResponse.json(library, { status: 201 })
  } catch (error: any) {
    console.error("Erreur lors de la création de la bibliothèque:", error)
    return NextResponse.json(
      { message: error.message || "Erreur lors de la création de la bibliothèque" },
      { status: 500 },
    )
  }
}
