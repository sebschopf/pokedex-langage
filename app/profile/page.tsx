"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Profil Utilisateur</CardTitle>
          <CardDescription>Gérez vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="text" value={user?.email} disabled />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Nom d'utilisateur
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Rôle
            </label>
            <Input id="role" type="text" value={userRole || "utilisateur"} disabled />
          </div>

          {/* Lien vers le dashboard admin si l'utilisateur est admin ou validator */}
          {(userRole === "admin" || userRole === "validator") && (
            <div className="pt-4">
              <Button variant="outline" className="w-full" onClick={() => router.push("/admin/dashboard")}>
                Accéder au tableau de bord d'administration
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSignOut} disabled={updating}>
            Se déconnecter
          </Button>
          <Button onClick={updateProfile} disabled={updating}>
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Mettre à jour"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

