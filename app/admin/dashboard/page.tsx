"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/dashboard"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createBrowserClient } from "@/lib/client/supabase"
import type { User } from "@supabase/supabase-js"
import type { UserRoleType } from "@/lib/client/permissions"

// Remplacer l'interface Suggestion par celle-ci pour correspondre à celle attendue par AdminDashboard
interface Suggestion {
  id: number
  language_id: number | null
  field: string
  correction_text: string
  framework: string | null
  status: string
  suggestion: string | null
  user_id: string | null
  created_at: string
  updated_at: string | null
  languages?: {
    name: string
  }
  type?: string
  proposal_name?: string
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRoleType | null>(null)
  const [loading, setLoading] = useState(true)
  const [pendingSuggestionsCount, setPendingSuggestionsCount] = useState(0)
  const [pendingCorrectionsCount, setPendingCorrectionsCount] = useState(0)
  const [pendingProposalsCount, setPendingProposalsCount] = useState(0)
  const [languagesCount, setLanguagesCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [recentSuggestions, setRecentSuggestions] = useState<Suggestion[]>([])

  const { toast } = useToast()
  const supabase = createBrowserClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          redirect("/login")
          return
        }

        setUser(session.user)

        // Récupérer le rôle de l'utilisateur
        const { data: userRoleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (roleError) {
          console.error("Erreur lors de la récupération du rôle:", roleError)
          toast({
            title: "Erreur",
            description: "Impossible de récupérer votre rôle",
            variant: "destructive",
          })
          redirect("/")
          return
        }

        setUserRole(userRoleData.role as UserRoleType)

        // Le layout vérifie déjà le rôle, donc nous n'avons plus besoin de le faire ici

        // Récupérer les statistiques du tableau de bord
        const fetchDashboardStats = async () => {
          try {
            // Récupérer le nombre de suggestions en attente
            const { count: pendingSuggestions, error: pendingError } = await supabase
              .from("corrections")
              .select("*", { count: "exact", head: true })
              .eq("status", "pending")

            if (!pendingError) {
              setPendingSuggestionsCount(pendingSuggestions || 0)
            }

            // Récupérer le nombre de corrections en attente
            const { count: pendingCorrections, error: correctionsError } = await supabase
              .from("corrections")
              .select("*", { count: "exact", head: true })
              .eq("status", "pending")
              .neq("field", "new_language")

            if (!correctionsError) {
              setPendingCorrectionsCount(pendingCorrections || 0)
            }

            // Récupérer le nombre de propositions en attente
            const { count: pendingProposals, error: proposalsError } = await supabase
              .from("language_proposals")
              .select("*", { count: "exact", head: true })
              .eq("status", "pending")

            if (!proposalsError) {
              setPendingProposalsCount(pendingProposals || 0)
            }

            // Récupérer le nombre de langages
            const { count: languages, error: languagesError } = await supabase
              .from("languages")
              .select("*", { count: "exact", head: true })

            if (!languagesError) {
              setLanguagesCount(languages || 0)
            }

            // Récupérer le nombre d'utilisateurs
            const { count: users, error: usersError } = await supabase
              .from("profiles")
              .select("*", { count: "exact", head: true })

            if (!usersError) {
              setUsersCount(users || 0)
            }

            // Récupérer les suggestions récentes
            const { data: recentData, error: recentError } = await supabase
              .from("corrections")
              .select(`
                *,
                languages:language_id (name)
              `)
              .order("created_at", { ascending: false })
              .limit(5)

            if (!recentError && recentData) {
              // Transformer les données pour s'assurer que field n'est jamais null
              const processedData = recentData.map((item) => ({
                ...item,
                field: item.field || "", // Convertir null en chaîne vide
                created_at: item.created_at || new Date().toISOString(), // S'assurer que created_at n'est jamais null
              })) as Suggestion[]

              setRecentSuggestions(processedData)
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des statistiques:", error)
          }
        }

        await fetchDashboardStats()
      } catch (error) {
        console.error("Erreur:", error)
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement des données",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  // S'assurer que userRole n'est pas null avant de rendre le composant
  if (!userRole) {
    redirect("/login")
    return null
  }

  return (
    <AdminDashboard
      user={user}
      userRole={userRole}
      pendingSuggestionsCount={pendingSuggestionsCount}
      pendingCorrectionsCount={pendingCorrectionsCount}
      pendingProposalsCount={pendingProposalsCount}
      languagesCount={languagesCount}
      usersCount={usersCount}
      recentSuggestions={recentSuggestions}
    />
  )
}
