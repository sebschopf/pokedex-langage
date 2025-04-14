"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

import { useAuth } from "@/components/providers/auth-provider"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import type { Profile } from "@/types/models"
import type { UserRoleType } from "@/lib/client/permissions"

// Fonction utilitaire pour obtenir le libellé du rôle
function getRoleLabel(role: UserRoleType | null): string {
  if (!role) return "Non défini"

  const roleLabels: Record<string, string> = {
    admin: "Administrateur",
    validator: "Validateur",
    verified: "Utilisateur vérifié",
    registered: "Utilisateur enregistré",
    anonymous: "Visiteur",
  }

  return roleLabels[role] || "Rôle inconnu"
}

// Fonction utilitaire pour obtenir la classe CSS du badge de rôle
function getRoleBadgeClass(role: UserRoleType | null): string {
  if (!role) return "bg-gray-100"

  const roleBadgeClasses: Record<string, string> = {
    admin: "bg-red-100",
    validator: "bg-purple-100",
    verified: "bg-green-100",
    registered: "bg-blue-100",
    anonymous: "bg-gray-100",
  }

  return roleBadgeClasses[role] || "bg-gray-100"
}

export default function ProfilePage() {
  const { user, userRole, isLoading, signOut, refreshUserData } = useAuth()

  const [updating, setUpdating] = useState(false)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  // Charger les données du profil au montage du composant
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, bio, website")
          .eq("id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Erreur lors de la récupération du profil:", error)
          return
        }

        if (data) {
          setUsername(data.username || "")
          setBio(data.bio || "")
          setWebsite(data.website || "")
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error)
      }
    }

    loadProfileData()
  }, [user, supabase])

  const updateProfile = async () => {
    try {
      setUpdating(true)

      if (!user) return

      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        const profileData: Partial<Profile> = {
          id: user.id,
          username,
          bio,
          website,
          updatedAt: new Date().toISOString(),
        }

        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          username,
          bio,
          website,
          updated_at: new Date().toISOString(),
        })

        if (error) throw error

        // Rafraîchir les données utilisateur dans le contexte
        await refreshUserData()

        toast({
          title: "Profil mis à jour",
          description: "Votre profil a été mis à jour avec succès.",
        })
      })
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
    await signOut()
    router.push("/")
  }

  if (isLoading || !user) {
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
          {/* Section Rôle Utilisateur */}
          <div className="mb-6 p-4 border-4 border-black bg-gray-50">
            <h2 className="text-xl font-bold mb-2">Votre Rôle</h2>
            <div
              className={`inline-block px-4 py-2 border-4 border-black font-bold ${getRoleBadgeClass(userRole as UserRoleType)}`}
            >
              {getRoleLabel(userRole as UserRoleType)}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Votre rôle détermine les fonctionnalités auxquelles vous avez accès.
            </p>
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
                "Enregistrer les modifications"
              )}
            </button>
          </div>
        </div>

        {/* Fonctionnalités spécifiques au rôle */}
        {userRole && (userRole === "admin" || userRole === "validator") && (
          <div className="border-t-4 border-black p-6">
            <h2 className="text-xl font-bold mb-4">Fonctionnalités spéciales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRole === "admin" && (
                <button
                  onClick={() => router.push("/admin")}
                  className="p-4 border-4 border-black bg-red-100 hover:bg-red-200 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                >
                  Panneau d'administration
                </button>
              )}
              {(userRole === "admin" || userRole === "validator") && (
                <button
                  onClick={() => router.push("/validation")}
                  className="p-4 border-4 border-black bg-purple-100 hover:bg-purple-200 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
                >
                  Gérer les validations
                </button>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-4 border-black p-6">
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-white border-4 border-black text-black font-bold hover:bg-red-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}
