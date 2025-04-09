"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Home, User, PlusCircle, Code2, LogOut, ChevronRight, Upload } from "lucide-react"
import FileUpload from "@/components/file-upload"
import StorageManager from "@/components/storage-manager"

// Types pour les données
type NavItem = {
  name: string
  icon: React.ReactNode
  section: string
}

type Contribution = {
  id: string
  type: string
  name: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("profile")
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [corrections, setCorrections] = useState<any[]>([])
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Profil", icon: <User className="h-5 w-5" />, section: "profile" },
    { name: "Mes Propositions", icon: <PlusCircle className="h-5 w-5" />, section: "proposals" },
    { name: "Mes Corrections", icon: <Code2 className="h-5 w-5" />, section: "corrections" },
    { name: "Mes Fichiers", icon: <Upload className="h-5 w-5" />, section: "files" },
  ]

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

        // Récupérer le profil de l'utilisateur
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("username, bio, avatar_url")
            .eq("id", user.id)
            .single()

          if (profileData) {
            setUsername(profileData.username || "")
            setBio(profileData.bio || "")

            if (profileData.avatar_url) {
              const { data } = supabase.storage.from("avatars").getPublicUrl(profileData.avatar_url)
              setAvatarUrl(data.publicUrl)
            }
          }
        } catch (error) {
          console.log("Erreur lors de la récupération du profil:", error)
        }

        // Charger les données de l'utilisateur
        await loadUserData(user.id)
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

  const loadUserData = async (userId: string) => {
    try {
      // Récupérer les propositions de langages
      const { data: proposalsData } = await supabase
        .from("language_proposals")
        .select("*")
        .eq("id", userId)
        .order("created_at", { ascending: false })

      if (proposalsData) {
        setProposals(proposalsData)
      }

      // Récupérer les corrections
      const { data: correctionsData } = await supabase
        .from("corrections")
        .select("*")
        .eq("id", userId)
        .order("created_at", { ascending: false })

      if (correctionsData) {
        setCorrections(correctionsData)
      }

      // Combiner toutes les contributions pour l'affichage récent
      const allContributions: Contribution[] = [
        ...(proposalsData || []).map((p: any) => ({
          id: p.id,
          type: "Proposition",
          name: p.name,
          status: p.status,
          createdAt: p.created_at,
        })),
        ...(correctionsData || []).map((c: any) => ({
          id: c.id,
          type: "Correction",
          name: c.field,
          status: c.status,
          createdAt: c.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)

      setContributions(allContributions)
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
    }
  }

  const updateProfile = async () => {
    try {
      setUpdating(true)

      if (!user) return

      // Mettre à jour le profil
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username,
        bio,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès.",
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

  // Modifions la fonction handleAvatarUpload pour utiliser async/await
  const handleAvatarUpload = async (url: string) => {
    console.log("URL reçue dans handleAvatarUpload:", url)

    // Vérifier que l'URL est valide
    if (!url) {
      toast({
        title: "Erreur",
        description: "URL de l'avatar invalide",
        variant: "destructive",
      })
      return
    }

    try {
      // Extraire le nom du fichier de l'URL
      const urlObj = new URL(url)
      const pathSegments = urlObj.pathname.split("/")
      const fileName = pathSegments[pathSegments.length - 1]

      console.log("Nom de fichier extrait:", fileName)

      if (!fileName) {
        throw new Error("Impossible d'extraire le nom du fichier")
      }

      // Mettre à jour l'avatar dans la base de données
      if (user) {
        const { data, error } = await supabase.from("profiles").upsert({
          id: user.id,
          avatar_url: fileName, // Stocker uniquement le nom du fichier
          updated_at: new Date().toISOString(),
        })

        console.log("Résultat de la mise à jour:", { data, error })

        if (error) {
          throw error
        }

        setAvatarUrl(url) // Mettre à jour l'URL complète dans l'état
        toast({
          title: "Avatar mis à jour",
          description: "Votre avatar a été mis à jour avec succès.",
        })
      }
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'avatar:", error)
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour de l'avatar.",
        variant: "destructive",
      })
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
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
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight">Tableau de Bord</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-white border-4 border-black text-black font-black text-base uppercase hover:bg-blue-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Accueil
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-white border-4 border-black text-black font-black text-base uppercase hover:bg-red-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="p-4 border-b-4 border-black bg-yellow-300">
            <div className="font-black text-lg">{user?.email}</div>
            <div className="font-bold">{userRole || "Utilisateur"}</div>
          </div>
          <nav className="p-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => setActiveSection(item.section)}
                className={`w-full flex items-center justify-between p-3 mb-2 font-bold text-left transition-colors ${
                  activeSection === item.section ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeSection === "profile" && (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black p-4 bg-yellow-300">
                <h2 className="text-2xl font-black">Mon Profil</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="border-4 border-black w-full aspect-square mb-4 overflow-hidden">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-6xl font-black">{user?.email?.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <p className="font-bold text-center">Changer d'avatar</p>
                      <FileUpload
                        bucket="avatars"
                        onUploadComplete={handleAvatarUpload}
                        acceptedFileTypes="image/*"
                        maxSizeMB={2}
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <label className="block font-bold mb-2">Email</label>
                      <input
                        type="text"
                        value={user?.email}
                        disabled
                        className="w-full p-3 border-4 border-black font-medium bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Nom d'utilisateur</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Entrez votre nom d'utilisateur"
                        className="w-full p-3 border-4 border-black font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Parlez-nous de vous..."
                        className="w-full p-3 border-4 border-black font-medium min-h-[100px]"
                      ></textarea>
                    </div>
                    <button
                      onClick={updateProfile}
                      disabled={updating}
                      className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-green-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Enregistrement...
                        </>
                      ) : (
                        "Enregistrer les modifications"
                      )}
                    </button>
                  </div>
                </div>

                {/* Afficher les contributions récentes */}
                {contributions.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Contributions récentes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contributions.map((contribution) => (
                        <div key={contribution.id} className="border-2 border-black p-3">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">{contribution.name}</span>
                            <span
                              className={`px-2 py-1 text-xs font-bold ${
                                contribution.status === "approved"
                                  ? "bg-green-300"
                                  : contribution.status === "rejected"
                                    ? "bg-red-300"
                                    : "bg-yellow-300"
                              }`}
                            >
                              {contribution.status === "approved"
                                ? "Approuvé"
                                : contribution.status === "rejected"
                                  ? "Rejeté"
                                  : "En attente"}
                            </span>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span>{contribution.type}</span>
                            <span>{formatDate(contribution.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "proposals" && (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black p-4 bg-yellow-300">
                <h2 className="text-2xl font-black">Mes Propositions</h2>
              </div>
              <div className="p-6">
                {proposals && proposals.length > 0 ? (
                  <div className="space-y-4">
                    {proposals.map((proposal) => (
                      <div key={proposal.id} className="border-4 border-black p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg">{proposal.name}</h3>
                          <span
                            className={`px-3 py-1 font-bold ${
                              proposal.status === "approved"
                                ? "bg-green-300"
                                : proposal.status === "rejected"
                                  ? "bg-red-300"
                                  : "bg-yellow-300"
                            } border-2 border-black`}
                          >
                            {proposal.status === "approved"
                              ? "Approuvé"
                              : proposal.status === "rejected"
                                ? "Rejeté"
                                : "En attente"}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{proposal.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span>Proposé le: {formatDate(proposal.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-50 border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Vous n'avez pas encore fait de propositions.</p>
                    <p className="mt-2">
                      <a href="/" className="text-blue-600 underline">
                        Retourner à l'accueil
                      </a>{" "}
                      pour proposer un nouveau langage.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "corrections" && (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black p-4 bg-yellow-300">
                <h2 className="text-2xl font-black">Mes Corrections</h2>
              </div>
              <div className="p-6">
                {corrections && corrections.length > 0 ? (
                  <div className="space-y-4">
                    {corrections.map((correction) => (
                      <div key={correction.id} className="border-4 border-black p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg">{correction.field}</h3>
                          <span
                            className={`px-3 py-1 font-bold ${
                              correction.status === "approved"
                                ? "bg-green-300"
                                : correction.status === "rejected"
                                  ? "bg-red-300"
                                  : "bg-yellow-300"
                            } border-2 border-black`}
                          >
                            {correction.status === "approved"
                              ? "Approuvé"
                              : correction.status === "rejected"
                                ? "Rejeté"
                                : "En attente"}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{correction.correction_text}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span>Proposé le: {formatDate(correction.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-50 border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Vous n'avez pas encore proposé de corrections.</p>
                    <p className="mt-2">
                      <a href="/" className="text-blue-600 underline">
                        Retourner à l'accueil
                      </a>{" "}
                      pour proposer des corrections.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === "files" && (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-4 border-black p-4 bg-yellow-300">
                <h2 className="text-2xl font-black">Mes Fichiers</h2>
              </div>
              <div className="p-6">
                <StorageManager
                  bucket="logos"
                  onSelect={(url) => {
                    navigator.clipboard.writeText(url)
                    toast({
                      title: "URL copiée",
                      description: "L'URL du fichier a été copiée dans le presse-papier.",
                    })
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

