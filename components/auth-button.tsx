"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, User, LayoutDashboard } from 'lucide-react'
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AuthButton() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)

          // Récupérer le rôle de l'utilisateur
          const { data: userRoleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("id", session.user.id) 
            .single()

          if (userRoleData) {
            setUserRole(userRoleData.role)
          }

          // Récupérer l'avatar de l'utilisateur
          try {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("avatar_url")
              .eq("id", session.user.id) 
              .single()

            if (profileData?.avatar_url) {
              const { data } = supabase.storage.from("avatars").getPublicUrl(profileData.avatar_url)

              setAvatarUrl(data.publicUrl)
            }
          } catch (error) {
            console.log("Erreur lors de la récupération de l'avatar:", error)
          }
        }
      } catch (error) {
        console.log("Erreur lors de la récupération de l'utilisateur:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        getUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setUserRole(null)
        setAvatarUrl(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="px-6 py-3 bg-gray-200 border-4 border-black text-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Chargement</span>
      </div>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative h-12 w-12 rounded-none border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:-translate-y-1 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl || "/placeholder.svg"} alt={user.email} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-300 font-black text-xl">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-0 min-w-[200px]"
        >
          <div className="flex items-center justify-start gap-2 p-3 border-b-4 border-black bg-yellow-100">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-bold">{user.email}</p>
              <p className="text-sm font-medium">{userRole || "Utilisateur"}</p>
            </div>
          </div>

          <div className="p-1">
            <Link href="/profile" className="flex items-center w-full p-2 hover:bg-yellow-300 transition-colors">
              <User className="mr-2 h-4 w-4" />
              <span className="font-bold">Profil</span>
            </Link>

            <Link href="/dashboard" className="flex items-center w-full p-2 hover:bg-yellow-300 transition-colors">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span className="font-bold">Tableau de bord</span>
            </Link>

            {(userRole === "admin" || userRole === "validator") && (
              <Link
                href="/admin/dashboard"
                className="flex items-center w-full p-2 hover:bg-yellow-300 transition-colors"
              >
                <span className="font-bold">Tableau de bord</span>
              </Link>
            )}
          </div>

          <div className="border-t-4 border-black p-1">
            <button onClick={handleSignOut} className="flex items-center w-full p-2 hover:bg-red-300 transition-colors">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-bold">Se déconnecter</span>
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link
      href="/login"
      className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
    >
      Connexion
    </Link>
  )
}