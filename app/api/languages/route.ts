import { NextResponse } from "next/server"
import { getLanguages } from "@/lib/server/api/languages"

// Forcer le rendu dynamique de cette route
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const languageId = searchParams.get("languageId") ? Number(searchParams.get("languageId")) : undefined
    const technologyType = searchParams.get("technologyType") || undefined
    const sort = searchParams.get("sort") || undefined
    const page = Number(searchParams.get("page") || "1")
    const pageSize = Number(searchParams.get("pageSize") || "20")

    // Utiliser getLanguages au lieu de getAllLanguages
    const { data: languages } = await getLanguages()

    // Filtrage et tri basiques (à améliorer avec une implémentation plus robuste)
    let filteredLanguages = languages

    if (search) {
      filteredLanguages = filteredLanguages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(search.toLowerCase()) ||
          (lang.description && lang.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (languageId) {
      // Utiliser lang.id au lieu de lib.languageId
      filteredLanguages = filteredLanguages.filter((lang) => lang.id === languageId)
    }

    if (technologyType) {
      // Utiliser lang.type au lieu de lib.technologyType
      filteredLanguages = filteredLanguages.filter((lang) => lang.type === technologyType)
    }

    // Pagination
    const totalCount = filteredLanguages.length
    const paginatedLanguages = filteredLanguages.slice((page - 1) * pageSize, page * pageSize)

    return NextResponse.json({
      data: paginatedLanguages,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des langages" }, { status: 500 })
  }
}
