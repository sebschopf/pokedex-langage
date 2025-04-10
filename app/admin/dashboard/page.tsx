"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)

        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          // Le middleware devrait déjà gérer cette redirection, mais par sécurité
          router.push("/")
          return
        }

        setUser(session.user)

        // Vérifier le rôle de l'utilisateur
        const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

        if (roleData) {
          setUserRole(roleData.role)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="text-xl font-medium">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        <h1 className="text-3xl font-black mb-6">Tableau de bord d'administration</h1>

        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-md mb-6">
          <p className="font-medium">Vous êtes connecté en tant qu'administrateur.</p>
          <p>Email: {user?.email}</p>
          <p>Rôle: {userRole}</p>
          <p>ID: {user?.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-2 border-black p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Gestion des utilisateurs</h2>
            <p className="mb-4">Gérer les utilisateurs et leurs rôles</p>
            <button
              onClick={() => router.push("/admin/users")}
              className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
            >
              Accéder
            </button>
          </div>

          <div className="border-2 border-black p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Gestion des suggestions</h2>
            <p className="mb-4">Gérer les suggestions des utilisateurs</p>
            <button
              onClick={() => router.push("/admin/suggestions")}
              className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
            >
              Accéder
            </button>
          </div>

          <div className="border-2 border-black p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Statistiques</h2>
            <p className="mb-4">Voir les statistiques du site</p>
            <button className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800">Accéder</button>
          </div>
        </div>
      </div>
    </div>
  )
}
