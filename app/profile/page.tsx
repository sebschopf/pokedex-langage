"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, LogOut, Save, Home } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)

        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login")
          return
        }

        const { user } = session
        setUser(user)

        // Récupérer le rôle de l'utilisateur
        const { data: userRoleData } = await supabase.from("user_roles").select("role").eq("id", user.id).single()

        if (userRoleData) {
          setUserRole(userRoleData.role)
        }

        // Récupérer le profil de l'utilisateur si une table profiles existe
        try {
          const { data } = await supabase.from("profiles").select("username").eq("id", user.id).single()

          if (data) {
            setUsername(data.username || "")
          }
        } catch (error) {
          // La table profiles n'existe peut-être pas encore
          console.log("Erreur lors de la récupération du profil:", error)
        }
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [router, supabase, toast])

  const updateProfile = async () => {
    try {
      setUpdating(true)

      if (!user) return

      // Vérifier si la table profiles existe, sinon la créer
      try {
        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          username,
          updated_at: new Date().toISOString(),
        })

        if (error) throw error

        toast({
          title: "Profil mis à jour",
          description: "Votre profil a été mis à jour avec succès.",
        })
      } catch (error: any) {
        // Si la table n'existe pas, suggérer de la créer
        if (error.code === "PGRST116") {
          toast({
            title: "Table manquante",
            description: "La table profiles n'existe pas. Contactez l'administrateur.",
            variant: "destructive",
          })
        } else {
          throw error
        }
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="px-8 py-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center">
          <Loader2 className="h-8 w-8 animate-spin mr-3" />
          <span className="font-bold text-xl">Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="border-b-4 border-black p-6 bg-yellow-300 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Profil Utilisateur</h1>
            <p className="text-lg font-bold mt-1">Gérez vos informations personnelles</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-white border-4 border-black text-black font-black text-base uppercase hover:bg-blue-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Accueil
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-bold">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled
              className="w-full p-3 border-4 border-black font-medium text-base bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-lg font-bold">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              className="w-full p-3 border-4 border-black font-medium text-base"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-lg font-bold">
              Rôle
            </label>
            <input
              id="role"
              type="text"
              value={userRole || "utilisateur"}
              disabled
              className="w-full p-3 border-4 border-black font-medium text-base bg-gray-100"
            />
          </div>

          {/* Lien vers le dashboard admin si l'utilisateur est admin ou validator */}
          {(userRole === "admin" || userRole === "validator") && (
            <div className="pt-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="w-full px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-blue-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                Accéder au tableau de bord d'administration
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-6 flex justify-between">
          <button
            onClick={handleSignOut}
            disabled={updating}
            className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-red-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:bg-white flex items-center"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Se déconnecter
          </button>

          <button
            onClick={updateProfile}
            disabled={updating}
            className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-green-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:bg-white flex items-center"
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Mise à jour...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Mettre à jour
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

