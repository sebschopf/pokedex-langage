import { type NextRequest, NextResponse } from "next/server"
import { getFrameworksByLanguageId } from "@/lib/server/api/libraries"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const languageId = Number.parseInt(params.id, 10)
    if (isNaN(languageId)) {
      return NextResponse.json({ error: "ID de langage invalide" }, { status: 400 })
    }

    const frameworks = await getFrameworksByLanguageId(languageId)
    return NextResponse.json(frameworks)
  } catch (error) {
    console.error("Erreur lors de la récupération des frameworks:", error)
    return NextResponse.json({ error: "Erreur serveur lors de la récupération des frameworks" }, { status: 500 })
  }
}
