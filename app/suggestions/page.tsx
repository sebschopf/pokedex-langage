"use client"

import { getLanguages } from "@/lib/server/api/languages"
import { createCorrection } from "@/lib/server/api/corrections"
import { getUserRole } from "@/lib/server/api/users"
import { createServerComponentSupabaseClient } from "@/lib/supabase-app-router"
import { redirect } from "next/navigation"
import CorrectionForm from "../admin/suggestions/correction-form"
import type { Correction } from "@/types/models/correction"
import type { UserRoleType } from "@/types/models/user-role"

export default async function SuggestionsPage() {
  // Vérifier si l'utilisateur est connecté
  const supabase = createServerComponentSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirectTo=/suggestions")
  }

  // Récupérer le rôle de l'utilisateur
  const userRole = await getUserRole(session.user.id)

  // Vérifier si l'utilisateur a un rôle valide
  // Utiliser une approche plus typesafe pour la vérification
  const validRoles: UserRoleType[] = ["admin", "validator", "verified", "registered"]
  if (!userRole || !validRoles.includes(userRole as UserRoleType)) {
    redirect("/")
  }

  // Fonction pour créer une correction
  async function handleCreateCorrection(formData: FormData) {
    "use server"

    try {
      // Vérifier à nouveau la session côté serveur
      const supabase = createServerComponentSupabaseClient()
      const { data: sessionData } = await supabase.auth.getSession()
      const currentSession = sessionData.session

      if (!currentSession) {
        return { success: false, message: "Vous devez être connecté pour soumettre une correction" }
      }

      const languageId = Number.parseInt(formData.get("languageId") as string)
      const correctionText = formData.get("correctionText") as string
      const field = formData.get("field") as string
      const suggestion = formData.get("suggestion") as string

      // Créer un objet correction
      const correction: Omit<Correction, "id" | "updatedAt"> = {
        languageId,
        correctionText,
        field: field || null,
        suggestion: suggestion || null,
        status: "pending",
        userId: currentSession.user.id,
        createdAt: new Date().toISOString(),
        framework: null,
      }

      // Enregistrer la correction
      await createCorrection(correction)

      return { success: true }
    } catch (error) {
      console.error("Erreur lors de la création de la correction:", error)
      return { success: false }
    }
  }

  // Récupérer la liste des langages
  const { data: languages } = await getLanguages()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Proposer une correction</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-6 text-gray-700">
          Vous avez repéré une erreur ou souhaitez suggérer une amélioration pour un langage de programmation ? Utilisez
          ce formulaire pour nous en faire part.
        </p>

        <CorrectionForm languages={languages} onSubmit={handleCreateCorrection} />
      </div>
    </div>
  )
}
