import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"
import { correctionToDb } from "@/lib/server/mapping/correction-mapping"
import type { Correction } from "@/types/models"

export const dynamic = "force-dynamic"

/**
 * Endpoint pour soumettre une nouvelle suggestion/correction pour un langage existant
 * Les utilisateurs anonymes peuvent soumettre des suggestions, mais pas des propositions de nouveaux langages
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Récupérer les données de la requête
    const suggestionData = await request.json()

    // Valider les données
    if (!suggestionData.correctionText || !suggestionData.languageId) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Créer l'objet de correction avec le bon format
    const correction: Omit<Correction, "id" | "createdAt" | "updatedAt"> = {
      correctionText: suggestionData.correctionText,
      languageId: suggestionData.languageId,
      field: suggestionData.field || null,
      framework: suggestionData.framework || null,
      suggestion: suggestionData.suggestion || null,
      status: "pending",
      userId: session?.user?.id || null, // Peut être null pour les utilisateurs anonymes
    }

    // Convertir en format DB et insérer dans la base de données
    const dbCorrection = correctionToDb(correction)

    const { data, error } = await supabase.from("corrections").insert(dbCorrection).select()

    if (error) {
      console.error("Erreur lors de l'insertion de la suggestion:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement de la suggestion", details: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Votre suggestion a été enregistrée et sera examinée par nos modérateurs.",
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
 * Endpoint pour récupérer les suggestions/corrections
 * Nécessite d'être connecté pour voir les suggestions
 */
export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour accéder aux suggestions" }, { status: 401 })
    }

    // Vérifier le rôle pour déterminer quelles suggestions montrer
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    let query = supabase.from("corrections").select("*, languages(name)").order("created_at", { ascending: false })

    // Si l'utilisateur n'est pas admin ou validateur, ne montrer que ses suggestions
    if (!userRole || !["admin", "validator"].includes(userRole.role)) {
      query = query.eq("user_id", session.user.id)
    }

    // Filtrer par statut si spécifié dans l'URL
    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erreur lors de la récupération des suggestions:", error)
      return NextResponse.json(
        { error: "Erreur lors de la récupération des suggestions", details: error.message },
        { status: 500 },
      )
    }

    // Convertir les données en format d'application
    const { dbToCorrection } = await import("@/lib/server/mapping/correction-mapping")
    const suggestions = data.map((item) => {
      const suggestion = dbToCorrection(item)
      // Ajouter le nom du langage qui vient de la jointure
      return {
        ...suggestion,
        languageName: item.languages?.name,
      }
    })

    return NextResponse.json({ success: true, data: suggestions })
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
