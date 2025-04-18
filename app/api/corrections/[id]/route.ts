import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getLanguageById } from "@/lib/server/api/languages"
import { dbToCorrection } from "@/lib/server/mapping/correction-mapping"

export const dynamic = "force-dynamic"

/**
 * Endpoint pour mettre à jour le statut d'une correction
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour modifier une correction" }, { status: 401 })
    }

    // Vérifier si l'utilisateur a le rôle requis (admin ou validator)
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    if (!userRole || !["admin", "validator"].includes(userRole.role)) {
      return NextResponse.json({ error: "Vous n'avez pas les permissions nécessaires" }, { status: 403 })
    }

    const { id } = params
    const { status } = await request.json()

    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    // Récupérer la correction
    const { data: correction, error: correctionError } = await supabase
      .from("corrections")
      .select("*")
      .eq("id", Number.parseInt(id))
      .single()

    if (correctionError || !correction) {
      return NextResponse.json({ error: "Correction non trouvée", details: correctionError?.message }, { status: 404 })
    }

    // Mettre à jour le statut de la correction
    const { error: updateError } = await supabase
      .from("corrections")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", Number.parseInt(id))

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour de la correction", details: updateError.message },
        { status: 500 },
      )
    }

    // Si la correction est approuvée, mettre à jour le langage
    if (status === "approved" && correction.language_id && correction.field) {
      // Récupérer le langage
      const language = await getLanguageById(Number(correction.language_id))

      if (!language) {
        return NextResponse.json(
          {
            error: "Langage non trouvé",
            status: "La correction a été approuvée mais le langage n'a pas pu être mis à jour",
          },
          { status: 404 },
        )
      }

      // Mettre à jour le champ spécifié
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString(),
      }

      // Ajouter le champ à mettre à jour
      updateData[correction.field] = correction.correction_text

      // Mettre à jour le langage
      const { error: languageUpdateError } = await supabase
        .from("languages")
        .update(updateData)
        .eq("id", correction.language_id)

      if (languageUpdateError) {
        return NextResponse.json(
          {
            error: "Erreur lors de la mise à jour du langage",
            details: languageUpdateError.message,
            status: "La correction a été approuvée mais le langage n'a pas pu être mis à jour",
          },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: status === "approved" ? "Correction approuvée et langage mis à jour" : "Correction rejetée",
    })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors du traitement de votre demande",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

/**
 * Endpoint pour récupérer une correction spécifique
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour accéder aux corrections" }, { status: 401 })
    }

    const { id } = params

    // Récupérer la correction
    const { data: correction, error } = await supabase
      .from("corrections")
      .select("*, languages(name)")
      .eq("id", Number.parseInt(id))
      .single()

    if (error) {
      return NextResponse.json({ error: "Correction non trouvée", details: error.message }, { status: 404 })
    }

    // Vérifier si l'utilisateur a le droit de voir cette correction
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    const isAdminOrValidator = userRole && ["admin", "validator"].includes(userRole.role)
    const isOwner = correction.user_id === session.user.id

    if (!isAdminOrValidator && !isOwner) {
      return NextResponse.json(
        { error: "Vous n'avez pas les permissions nécessaires pour voir cette correction" },
        { status: 403 },
      )
    }

    // Convertir en format d'application
    const formattedCorrection = dbToCorrection(correction)

    return NextResponse.json({ success: true, data: formattedCorrection })
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors du traitement de votre demande",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
