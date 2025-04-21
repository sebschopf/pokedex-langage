import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const toolId = Number.parseInt(params.id)

    if (isNaN(toolId)) {
      return NextResponse.json({ error: "ID d'outil invalide" }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("library_languages")
      .select(`
        language_id,
        primary_language,
        languages:language_id (
          id,
          name,
          slug,
          logo_path
        )
      `)
      .eq("library_id", toolId)

    if (error) {
      console.error("Erreur lors de la récupération des langages:", error)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const toolId = Number.parseInt(params.id)

    if (isNaN(toolId)) {
      return NextResponse.json({ error: "ID d'outil invalide" }, { status: 400 })
    }

    const body = await request.json()
    const { languageId, isPrimary = false } = body

    if (!languageId) {
      return NextResponse.json({ error: "ID de langage requis" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Si on définit ce langage comme principal, mettre à jour les autres langages
    if (isPrimary) {
      // Mettre à jour tous les autres langages pour qu'ils ne soient plus principaux
      const { error: updateError } = await supabase
        .from("library_languages")
        .update({ primary_language: false })
        .eq("library_id", toolId)
        .neq("language_id", languageId)

      if (updateError) {
        console.error("Erreur lors de la mise à jour des autres langages:", updateError)
        return NextResponse.json({ error: "Erreur lors de la mise à jour des autres langages" }, { status: 500 })
      }
    }

    // Vérifier si l'association existe déjà
    const { data: existingAssoc, error: checkError } = await supabase
      .from("library_languages")
      .select("*")
      .eq("library_id", toolId)
      .eq("language_id", languageId)
      .maybeSingle()

    if (checkError) {
      console.error("Erreur lors de la vérification de l'association:", checkError)
      return NextResponse.json({ error: "Erreur lors de la vérification de l'association" }, { status: 500 })
    }

    // Si l'association existe déjà, mettre à jour le statut primaire
    if (existingAssoc) {
      const { error: updateError } = await supabase
        .from("library_languages")
        .update({ primary_language: isPrimary })
        .eq("library_id", toolId)
        .eq("language_id", languageId)

      if (updateError) {
        console.error("Erreur lors de la mise à jour de l'association:", updateError)
        return NextResponse.json({ error: "Erreur lors de la mise à jour de l'association" }, { status: 500 })
      }
    } else {
      // Sinon, créer une nouvelle association
      const { error: insertError } = await supabase.from("library_languages").insert({
        library_id: toolId,
        language_id: languageId,
        primary_language: isPrimary,
        created_at: new Date().toISOString(),
      })

      if (insertError) {
        console.error("Erreur lors de la création de l'association:", insertError)
        return NextResponse.json({ error: "Erreur lors de la création de l'association" }, { status: 500 })
      }
    }

    // Revalider les chemins pertinents
    revalidatePath(`/tools/${params.id}`)
    revalidatePath(`/tools`)

    return NextResponse.json({ message: "Association mise à jour avec succès" })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const toolId = Number.parseInt(params.id)

    if (isNaN(toolId)) {
      return NextResponse.json({ error: "ID d'outil invalide" }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const languageId = Number.parseInt(searchParams.get("languageId") || "")

    if (isNaN(languageId)) {
      return NextResponse.json({ error: "ID de langage invalide" }, { status: 400 })
    }

    const supabase = createServerClient()

    // Supprimer l'association
    const { error } = await supabase
      .from("library_languages")
      .delete()
      .eq("library_id", toolId)
      .eq("language_id", languageId)

    if (error) {
      console.error("Erreur lors de la suppression de l'association:", error)
      return NextResponse.json({ error: "Erreur lors de la suppression de l'association" }, { status: 500 })
    }

    // Revalider les chemins pertinents
    revalidatePath(`/tools/${params.id}`)
    revalidatePath(`/tools`)

    return NextResponse.json({ message: "Association supprimée avec succès" })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
