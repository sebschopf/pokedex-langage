import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createServerClient()

  try {
    // Statistiques de base
    const { data: profiles, error: profilesError } = await supabase.from("profiles").select("*")
    const { data: languages, error: languagesError } = await supabase.from("languages").select("*")
    const { data: corrections, error: correctionsError } = await supabase.from("corrections").select("*")

    // Statistiques des formulaires en attente
    const { data: pendingCorrections, error: pendingCorrectionsError } = await supabase
      .from("corrections")
      .select("*")
      .eq("status", "pending")

    const { data: pendingProposals, error: pendingProposalsError } = await supabase
      .from("language_proposals")
      .select("*")
      .eq("status", "pending")

    // Statistiques des utilisateurs vérifiés
    const { data: verifiedUsers, error: verifiedUsersError } = await supabase
      .from("user_roles")
      .select("*")
      .in("role", ["admin", "validator", "verified"])

    // Statistiques des todos
    const { data: todos, error: todosError } = await supabase.from("todos").select("*")

    // Todos par statut
    const { data: todoStatus, error: todoStatusError } = await supabase.from("todo_status").select("*")

    // Récupérer le nombre de todos par statut
    const todosByStatus = []
    if (todoStatus && !todoStatusError) {
      for (const status of todoStatus) {
        const { count, error } = await supabase
          .from("todos")
          .select("*", { count: "exact", head: true })
          .eq("status_id", status.id)

        if (!error) {
          todosByStatus.push({
            status: status.name,
            count: count || 0,
          })
        }
      }
    }

    // Todos par catégorie
    const { data: todoCategories, error: todoCategoriesError } = await supabase.from("todo_categories").select("*")

    // Récupérer le nombre de todos par catégorie
    const todosByCategory = []
    if (todoCategories && !todoCategoriesError) {
      for (const category of todoCategories) {
        const { count, error } = await supabase
          .from("todos")
          .select("*", { count: "exact", head: true })
          .eq("category_id", category.id)

        if (!error) {
          todosByCategory.push({
            category: category.name,
            count: count || 0,
          })
        }
      }
    }

    // Todos récents (derniers 7 jours)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoStr = sevenDaysAgo.toISOString()

    const { data: recentTodos, error: recentTodosError } = await supabase
      .from("todos")
      .select("*")
      .gte("created_at", sevenDaysAgoStr)

    // Vérifier les erreurs
    const errors = [
      profilesError,
      languagesError,
      correctionsError,
      pendingCorrectionsError,
      pendingProposalsError,
      verifiedUsersError,
      todosError,
      todoStatusError,
      todoCategoriesError,
      recentTodosError,
    ].filter(Boolean)

    if (errors.length > 0) {
      console.error("Erreur lors de la récupération des données:", errors)
      return NextResponse.json({ error: "Échec de la récupération des données" }, { status: 500 })
    }

    // Calculer les statistiques
    const userCount = profiles?.length || 0
    const languageCount = languages?.length || 0
    const correctionCount = corrections?.length || 0
    const pendingCorrectionCount = pendingCorrections?.length || 0
    const pendingProposalCount = pendingProposals?.length || 0
    const verifiedUserCount = verifiedUsers?.length || 0
    const todoCount = todos?.length || 0
    const recentTodoCount = recentTodos?.length || 0

    // Calculer le nombre total de formulaires en attente
    const totalPendingCount = pendingCorrectionCount + pendingProposalCount

    return NextResponse.json({
      users: userCount,
      languages: languageCount,
      corrections: correctionCount,
      pendingCorrections: pendingCorrectionCount,
      pendingProposals: pendingProposalCount,
      totalPending: totalPendingCount,
      verifiedUsers: verifiedUserCount,
      todos: {
        total: todoCount,
        recent: recentTodoCount,
        byStatus: todosByStatus,
        byCategory: todosByCategory,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
