"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { createProposal, updateProposal } from "@/lib/server/api/proposals"
import type { LanguageProposal } from "@/types/models/language-proposal"

/**
 * Met à jour le statut d'une proposition de langage
 * @param id Identifiant de la proposition
 * @param status Nouveau statut (approved ou rejected)
 */
export async function updateProposalStatus(id: number, status: "approved" | "rejected") {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("Vous devez être connecté pour effectuer cette action")
    }

    // Vérifier le rôle de l'utilisateur
    const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
      throw new Error("Vous n'avez pas les permissions nécessaires pour effectuer cette action")
    }

    // Mettre à jour le statut de la proposition via la fonction d'API
    await updateProposal(id, { status, updatedAt: new Date().toISOString() })

    // Si la proposition est approuvée, créer un nouveau langage
    if (status === "approved") {
      // Récupérer les détails de la proposition
      const { data: proposal, error: fetchError } = await supabase
        .from("language_proposals")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) {
        throw new Error(`Erreur lors de la récupération de la proposition: ${fetchError.message}`)
      }

      // Créer le nouveau langage
      const { error: insertError } = await supabase.from("languages").insert({
        name: proposal.name,
        type: proposal.type,
        short_description: proposal.description,
        used_for: proposal.used_for || "",
        created_year: proposal.created_year || null,
        logo_path: "/placeholder.svg", // Logo par défaut
        usage_rate: 0, // Valeur par défaut
        popular_frameworks: [],
        strengths: [],
        difficulty: 1, // Valeur par défaut
        is_open_source: true, // Valeur par défaut
        tools: {}, // Valeur par défaut
        slug: proposal.name.toLowerCase().replace(/\s+/g, "-"),
        created_at: new Date().toISOString(),
      })

      if (insertError) {
        throw new Error(`Erreur lors de la création du langage: ${insertError.message}`)
      }
    }

    // Revalider les chemins pour mettre à jour l'interface
    revalidatePath("/admin/suggestions")
    revalidatePath("/")

    return { success: true }
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du statut de la proposition:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Soumet une nouvelle proposition de langage
 * @param formData Données du formulaire
 */
export async function submitLanguageProposal(formData: FormData) {
  try {
    const supabase = createServerClient()

    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      throw new Error("Vous devez être connecté pour soumettre une proposition")
    }

    // Extraire les données du formulaire
    const name = formData.get("name") as string
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const createdYear = formData.get("createdYear") as string
    const creator = formData.get("creator") as string
    const usedFor = formData.get("usedFor") as string

    // Valider les données
    if (!name || !type || !description) {
      throw new Error("Veuillez remplir tous les champs obligatoires")
    }

    // Créer l'objet proposition
    const proposal: Partial<LanguageProposal> = {
      name,
      type,
      description,
      createdYear: createdYear ? Number.parseInt(createdYear) : null,
      creator: creator || null,
      usedFor: usedFor || null,
      status: "pending",
      userId: session.user.id,
      createdAt: new Date().toISOString(),
    }

    // Soumettre la proposition via la fonction d'API
    await createProposal(proposal)

    // Revalider les chemins pour mettre à jour l'interface
    revalidatePath("/suggestions")

    return { success: true }
  } catch (error: any) {
    console.error("Erreur lors de la soumission de la proposition:", error)
    return { success: false, error: error.message }
  }
}
