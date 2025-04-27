import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { getLanguageById } from "@/lib/server/api/languages"
import { dbToCorrection } from "@/lib/server/mapping/correction-mapping"
import type { DbLanguage } from "@/types/database/language"

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
      const updateData: Partial<DbLanguage> = {
        updated_at: new Date().toISOString(),
      }

      // Vérifier si le champ existe dans le modèle DbLanguage
      if (correction.field && isValidLanguageField(correction.field)) {
        // Utiliser une approche typée pour mettre à jour le champ
        updateLanguageField(updateData, correction.field, correction.correction_text)
      } else {
        console.warn(`Champ invalide ou non reconnu: ${correction.field}`)
      }

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

/**
 * Vérifie si un champ est une propriété valide du modèle DbLanguage
 * @param field Nom du champ à vérifier
 * @returns true si le champ est valide
 */
function isValidLanguageField(field: string): field is keyof DbLanguage {
  const validFields: Array<keyof DbLanguage> = [
    "name",
    "slug",
    "description",
    "short_description",
    "type",
    "creator",
    "year_created",
    "usage_rate",
    "is_open_source",
    "used_for",
    "logo_path",
    "popular_frameworks",
    "created_at",
    "updated_at",
    "github_url",
    "website_url",
    "current_version",
    "last_updated",
    "license",
    "difficulty",
    "strengths",
    "tools",
  ]
  return validFields.includes(field as keyof DbLanguage)
}

/**
 * Met à jour un champ du langage en respectant son type
 * @param updateData Objet de mise à jour
 * @param field Nom du champ à mettre à jour
 * @param value Valeur à assigner
 */
function updateLanguageField(updateData: Partial<DbLanguage>, field: keyof DbLanguage, value: string): void {
  // Traiter les champs en fonction de leur type attendu
  switch (field) {
    // Champs de type string
    case "name":
    case "slug":
    case "description":
    case "short_description":
    case "type":
    case "creator":
    case "used_for":
    case "logo_path":
    case "github_url":
    case "website_url":
    case "current_version":
    case "last_updated":
    case "license":
      updateData[field] = value
      break

    // Champs de type number
    case "year_created":
    case "usage_rate":
    case "difficulty":
      updateData[field] = Number(value)
      break

    // Champs de type boolean
    case "is_open_source":
      updateData[field] = value.toLowerCase() === "true"
      break

    // Champs de type array
    case "popular_frameworks":
    case "strengths":
      try {
        updateData[field] = JSON.parse(value)
      } catch (e) {
        console.error(`Erreur lors de la conversion en tableau: ${e}`)
      }
      break

    // Champs de type JSON
    case "tools":
      try {
        updateData[field] = JSON.parse(value)
      } catch (e) {
        console.error(`Erreur lors de la conversion en JSON: ${e}`)
      }
      break

    // Champs de type date
    case "created_at":
    case "updated_at":
      updateData[field] = value
      break

    default:
      console.warn(`Champ non géré: ${field}`)
  }
}
