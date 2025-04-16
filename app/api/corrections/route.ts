import { NextResponse } from "next/server"
{ createServerClient } from "@/lib/supabase"
import { correctionToDb } from "@/lib/server/mapping/correction-mapping"
import type { Correction } from "@/types/models"

export const dynamic = "force-dynamic"

/**
 * Endpoint pour soumettre une nouvelle correction
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour soumettre une correction" }, { status: 401 })
    }

    // Récupérer les données de la requête
    const correctionData = await request.json()

    // Valider les données
    if (!correctionData.correctionText || !correctionData.languageId) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer l'objet de correction avec le bon format
    const correction: Omit<Correction, "id" | "createdAt" | "updatedAt"> = {
      correctionText: correctionData.correctionText,
      languageId: correctionData.languageId,
      field: correctionData.field || null,
      framework: correctionData.framework || null,
      suggestion: correctionData.suggestion || null,
      status: "pending",
      userId: session.user.id,
    }

    // Convertir en format DB et insérer dans la base de données
    const dbCorrection = correctionToDb(correction)

    const { data, error } = await supabase.from("corrections").insert(dbCorrection).select()

    if (error) {
      console.error("Erreur lors de l'insertion de la correction:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement de la correction", details: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, data })
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
 * Endpoint pour récupérer les corrections
 */
export async function GET(request: Request) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour accéder aux corrections" }, { status: 401 })
    }

    // Vérifier le rôle pour déterminer quelles corrections montrer
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    let query = supabase.from("corrections").select("*, languages(name)").order("created_at", { ascending: false })

    // Si l'utilisateur n'est pas admin ou validateur, ne montrer que ses corrections
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
      console.error("Erreur lors de la récupération des corrections:", error)
      return NextResponse.json(
        { error: "Erreur lors de la récupération des corrections", details: error.message },
        { status: 500 },
      )
    }

    // Convertir les données en format d'application
    const { dbToCorrection } = await import("@/lib/server/mapping/correction-mapping")
    const corrections = data.map((item) => {
      const correction = dbToCorrection(item)
      // Ajouter le nom du langage qui vient de la jointure
      return {
        ...correction,
        languageName: item.languages?.name,
      }
    })

    return NextResponse.json({ success: true, data: corrections })
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
