import { NextResponse } from "next/server"
import { getLanguageById } from "@/lib/server/api/languages"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifier que l'ID est présent
    if (!params.id) {
      return NextResponse.json({ error: "ID du langage manquant" }, { status: 400 })
    }

    const language = await getLanguageById(Number(params.id))

    if (!language) {
      return NextResponse.json({ error: "Langage non trouvé" }, { status: 404 })
    }

    return NextResponse.json(language)
  } catch (error) {
    console.error("Erreur lors de la récupération du langage:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération du langage" }, { status: 500 })
  }
}
