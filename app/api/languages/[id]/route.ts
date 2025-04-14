import { NextResponse } from "next/server"
import { getFrameworksByLanguageId } from "@/lib/server/api/libraries"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const languageId = searchParams.get("languageId")

    if (!languageId) {
      return NextResponse.json({ error: "ID de langage requis" }, { status: 400 })
    }

    const frameworks = await getFrameworksByLanguageId(Number(languageId))
    return NextResponse.json(frameworks)
  } catch (error) {
    console.error("Erreur lors de la récupération des frameworks:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
