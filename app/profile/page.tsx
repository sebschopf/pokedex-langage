"use client"

import { useState, useEffect } from "react" // Ajout de l'import useEffect manquant
import { useRouter } from "next/navigation"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, LogOutIcon as _LogOut, SaveIcon as _Save, HomeIcon as _Home } from 'lucide-react' 
// TODO(#4): Utiliser ces icônes dans l'interface utilisateur ou les supprimer

import { useAuth } from "@/components/providers/auth-provider"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import type { Profile } from "@/types/models"

export default function ProfilePage() {
  // TODO(#4): Implémenter l'affichage et les fonctionnalités spécifiques au rôle utilisateur
  const { user, _userRole, isLoading, signOut, refreshUserData } = useAuth()
  
  const [_updating, setUpdating] = useState(false)
  // TODO(#4): Utiliser _updating pour désactiver les boutons pendant les mises à jour
  
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
          
        if (error && error.code !== 'PGRST116') {
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
        // TODO(#4): Utiliser ce modèle pour la validation et la transformation des données
        const _profileData: Partial<Profile> = {
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
              disabled={_updating}
              className="w-full px-6 py-3 bg-black text-white font-black text-lg uppercase hover:bg-gray-800 hover:-translate-y-1 transition-all"
            >
              {_updating ? (
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

      {/* TODO(#4): Ajouter une section pour afficher et gérer les rôles utilisateur */}
      {/* TODO(#4): Implémenter un tableau de bord spécifique au rôle */}
    </div>
  )
}