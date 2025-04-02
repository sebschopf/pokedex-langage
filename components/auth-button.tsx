"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut, User } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={user.email} />
              ) : (
                <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-muted-foreground">{userRole || "Utilisateur"}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
          {(userRole === "admin" || userRole === "validator") && (
            <DropdownMenuItem asChild>
              <Link href="/admin/dashboard">
                <span>Tableau de bord</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button asChild>
      <Link href="/login">Connexion</Link>
    </Button>
  )
}

