import { NextResponse } from "next/server"
import { getLanguageBySlug } from "@/lib/server/api/languages"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const language = await getLanguageBySlug(params.slug)

    if (!language) {
      return NextResponse.json({ error: "Langage non trouvé" }, { status: 404 })
    }

    return NextResponse.json(language)
  } catch (error) {
    console.error("Erreur lors de la récupération du langage par slug:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
