import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/dashboard"

export const metadata = {
  title: "Tableau de bord d'administration | POKEDEX_DEV",
  description: "Gérez les suggestions, les langages et les utilisateurs",
}

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient()

  // Vérifier si l'utilisateur est connecté et a le rôle admin ou validator
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/dashboard")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
    redirect("/")
  }

  // Récupérer les statistiques
  const { count: pendingCorrectionsCount } = await supabase
    .from("corrections")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: pendingProposalsCount } = await supabase
    .from("language_proposals")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: languagesCount } = await supabase.from("languages").select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase.from("user_roles").select("*", { count: "exact", head: true })

  // Récupérer les dernières suggestions (corrections et propositions)
  const { data: recentCorrections } = await supabase
    .from("corrections")
    .select("*, languages(name)")
    .order("created_at", { ascending: false })
    .limit(3)

  const { data: recentProposals } = await supabase
    .from("language_proposals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2)

  // Combiner les corrections et propositions récentes
  const recentSuggestions = [
    ...(recentCorrections || []).map((correction) => ({
      ...correction,
      type: "correction",
    })),
    ...(recentProposals || []).map((proposal) => ({
      id: proposal.id,
      field: "new_language",
      correction_text: proposal.description,
      status: proposal.status,
      created_at: proposal.created_at,
      type: "proposal",
      proposal_name: proposal.name,
    })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  // Calculer le nombre total de suggestions en attente
  const totalPendingSuggestions = (pendingCorrectionsCount || 0) + (pendingProposalsCount || 0)

  return (
    <AdminDashboard
      pendingSuggestionsCount={totalPendingSuggestions}
      pendingCorrectionsCount={pendingCorrectionsCount || 0}
      pendingProposalsCount={pendingProposalsCount || 0}
      languagesCount={languagesCount || 0}
      usersCount={usersCount || 0}
      recentSuggestions={recentSuggestions || []}
      userRole={userRole.role}
    />
  )
}

