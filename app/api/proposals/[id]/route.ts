import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"
import { languageProposalToDb } from "@/lib/server/mapping/language-proposal-mapping"
import type { LanguageProposal } from "@/types/models/language-proposal"

export const dynamic = "force-dynamic"

/**
 * Endpoint pour soumettre une nouvelle proposition de langage
 * Nécessite d'être connecté pour soumettre une proposition
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour soumettre une proposition" }, { status: 401 })
    }

    // Vérifier si l'utilisateur a le rôle requis
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    if (!userRole || !["admin", "validator", "verified", "registered"].includes(userRole.role)) {
      return NextResponse.json({ error: "Vous n'avez pas les permissions nécessaires" }, { status: 403 })
    }

    // Récupérer les données de la requête
    const proposalData = await request.json()

    // Valider les données
    if (!proposalData.name || !proposalData.type || !proposalData.description) {
      return NextResponse.json({ error: "Tous les champs obligatoires doivent être remplis" }, { status: 400 })
    }

    // Créer l'objet de proposition avec le bon format
    const proposal: Omit<LanguageProposal, "id" | "createdAt" | "updatedAt"> = {
      name: proposalData.name,
      description: proposalData.description,
      type: proposalData.type,
      status: proposalData.status || "pending",
      userId: session.user.id,
      creator: proposalData.creator || null,
      createdYear: proposalData.createdYear || null,
      popularFrameworks: proposalData.popularFrameworks || null,
      strengths: proposalData.strengths || null,
      usedFor: proposalData.usedFor || null,
    }

    // Convertir en format DB et insérer dans la base de données
    const dbProposal = languageProposalToDb(proposal)

    const { data, error } = await supabase.from("language_proposals").insert(dbProposal).select()

    if (error) {
      console.error("Erreur lors de l'insertion de la proposition:", error)
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement de la proposition", details: error.message },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Votre proposition a été enregistrée et sera examinée par nos modérateurs.",
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
 * Endpoint pour récupérer les propositions de langages
 * Nécessite d'être connecté pour voir les propositions
 */
export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Vérifier si l'utilisateur est authentifié
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Vous devez être connecté pour accéder aux propositions" }, { status: 401 })
    }

    // Vérifier le rôle pour déterminer quelles propositions montrer
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    let query = supabase.from("language_proposals").select("*").order("created_at", { ascending: false })

    // Si l'utilisateur n'est pas admin ou validateur, ne montrer que ses propositions
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
      console.error("Erreur lors de la récupération des propositions:", error)
      return NextResponse.json(
        { error: "Erreur lors de la récupération des propositions", details: error.message },
        { status: 500 },
      )
    }

    // Convertir les données en format d'application
    const { dbToLanguageProposal } = await import("@/lib/server/mapping/language-proposal-mapping")
    const proposals = data.map(dbToLanguageProposal)

    return NextResponse.json({ success: true, data: proposals })
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
