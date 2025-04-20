import { NextResponse } from "next/server"
import { getAllLibraries, createLibrary } from "@/lib/server/api/libraries"
import { isValidSlug } from "@/utils/slugs"
import type { Library } from "@/types/models/library"
import { generateSlug } from "@/utils/slugs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const languageId = searchParams.get("languageId") ? Number(searchParams.get("languageId")) : undefined
    const technologyType = searchParams.get("technologyType") || undefined
    const sort = searchParams.get("sort") || undefined
    const page = Number(searchParams.get("page") || "1")
    const pageSize = Number(searchParams.get("pageSize") || "20")

    // Correction: utiliser getAllLibraries au lieu de getLibraries
    const libraries = await getAllLibraries()

    // Filtrage et tri basiques (à améliorer avec une implémentation plus robuste)
    let filteredLibraries = libraries

    if (search) {
      filteredLibraries = filteredLibraries.filter(
        (lib) =>
          lib.name.toLowerCase().includes(search.toLowerCase()) ||
          (lib.description && lib.description.toLowerCase().includes(search.toLowerCase())),
      )
    }

    if (languageId) {
      filteredLibraries = filteredLibraries.filter((lib) => lib.languageId === languageId)
    }

    if (technologyType) {
      filteredLibraries = filteredLibraries.filter((lib) => lib.technologyType === technologyType)
    }

    // Pagination
    const totalCount = filteredLibraries.length
    const paginatedLibraries = filteredLibraries.slice((page - 1) * pageSize, page * pageSize)

    return NextResponse.json({
      data: paginatedLibraries,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des bibliothèques:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des bibliothèques" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation des champs obligatoires
    if (!body.name) {
      return NextResponse.json({ error: "Le nom est obligatoire" }, { status: 400 })
    }

    // Générer un slug si non fourni
    if (!body.slug) {
      body.slug = generateSlug(body.name)
    }

    // Validation du format du slug
    if (!isValidSlug(body.slug)) {
      return NextResponse.json(
        {
          error: "Le slug n'est pas valide. Utilisez uniquement des lettres minuscules, des chiffres et des tirets.",
        },
        { status: 400 },
      )
    }

    // Correction: convertir Partial<Library> en Omit<Library, "id">
    // en s'assurant que tous les champs obligatoires sont présents
    const libraryData: Omit<Library, "id"> = {
      name: body.name,
      slug: body.slug,
      // Définir des valeurs par défaut pour les champs obligatoires
      // et copier les valeurs optionnelles si elles existent
      languageId: body.languageId ?? null,
      description: body.description ?? null,
      officialWebsite: body.officialWebsite ?? null,
      githubUrl: body.githubUrl ?? null,
      logoPath: body.logoPath ?? null,
      popularity: body.popularity ?? null,
      isOpenSource: body.isOpenSource ?? null,
      createdAt: body.createdAt ?? new Date().toISOString(),
      updatedAt: body.updatedAt ?? null,
      features: body.features ?? null,
      uniqueSellingPoint: body.uniqueSellingPoint ?? null,
      bestFor: body.bestFor ?? null,
      usedFor: body.usedFor ?? null,
      documentationUrl: body.documentationUrl ?? null,
      version: body.version ?? null,
      technologyType: body.technologyType ?? null,
      subtype: body.subtype ?? null,
    }

    // Créer la bibliothèque
    const library = await createLibrary(libraryData)

    return NextResponse.json(library)
  } catch (error) {
    console.error("Erreur lors de la création de la bibliothèque:", error)

    // Gérer l'erreur de contrainte d'unicité
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return NextResponse.json(
        {
          error: "Un slug identique existe déjà. Veuillez en choisir un autre.",
        },
        { status: 409 },
      )
    }

    return NextResponse.json(
      {
        error: "Erreur lors de la création de la bibliothèque",
      },
      { status: 500 },
    )
  }
}
