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
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
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

        // Récupérer le rôle de l'utilisateur - Ajout de logs pour déboguer
        const { data: userRoleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", user.id)
          .single()

        console.log("User ID:", user.id)
        console.log("User role data:", userRoleData)

        if (roleError) {
          console.error("Erreur lors de la récupération du rôle:", roleError)
        }

        if (userRoleData) {
          setUserRole(userRoleData.role)
          console.log("Rôle défini:", userRoleData.role)
        }

        // Récupérer le profil de l'utilisateur
        try {
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("username, bio, website")
            .eq("id", user.id)
            .single()

          if (profileError) {
            console.error("Erreur lors de la récupération du profil:", profileError)
          }

          if (data) {
            setUsername(data.username || "")
            setBio(data.bio || "")
            setWebsite(data.website || "")
          }
        } catch (error) {
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
          bio,
          website,
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
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Chargement...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="border-b-4 border-black p-6">
          <h1 className="text-3xl font-black">Mon Profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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
            <label htmlFor="bio" className="text-lg font-bold">
              Biographie
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Parlez-nous de vous"
              className="w-full p-3 border-4 border-black font-medium text-base"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="website" className="text-lg font-bold">
              Site web
            </label>
            <input
              id="website"
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://votre-site-web.com"
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

          <div className="pt-4">
            <button
              onClick={updateProfile}
              disabled={updating}
              className="w-full px-6 py-3 bg-black text-white font-black text-lg uppercase hover:bg-gray-800 hover:-translate-y-1 transition-all"
            >
              {updating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2 inline" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2 inline" />
                  Enregistrer les modifications
                </>
              )}
            </button>
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

          {/* Lien direct vers le dashboard admin (pour déboguer) */}
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">
              Si le bouton ci-dessus n'apparaît pas malgré votre rôle d'administrateur, utilisez ce lien direct :
            </p>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="w-full px-6 py-3 bg-red-500 text-white font-black text-lg uppercase hover:bg-red-600 hover:-translate-y-1 transition-all"
            >
              Accès direct au tableau de bord admin
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-black p-6 flex justify-between">
          <button
            onClick={handleSignOut}
            disabled={updating}
            className="px-6 py-3 bg-white border-4 border-black text-black font-bold hover:bg-red-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogOut className="h-5 w-5 mr-2 inline" />
            Déconnexion
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-white border-4 border-black text-black font-bold hover:bg-blue-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Home className="h-5 w-5 mr-2 inline" />
            Retour à l'accueil
          </button>
        </div>
      </div>

      {/* Informations de débogage */}
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-md">
        <h3 className="font-bold mb-2">Informations de débogage :</h3>
        <p>User ID: {user?.id}</p>
        <p>Rôle: {userRole || "non défini"}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  )
}
