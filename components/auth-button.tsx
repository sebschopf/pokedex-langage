"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { LogIn, LogOut, User } from "lucide-react"
import { routes } from "@/utils/routes/routes"

export function AuthButton() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient()

    // Vérifier si l'utilisateur est connecté
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    checkUser()

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.refresh()
  }

  if (loading) {
    return <div className="w-[120px] h-10 bg-gray-200 animate-pulse rounded"></div>
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href={routes.auth.profile} className="flex items-center space-x-2 text-sm font-medium hover:underline">
          <User size={16} />
          <span>Profil</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <LogOut size={16} />
          <span>Déconnexion</span>
        </button>
      </div>
    )
  }

  return (
    <Link
      href={routes.auth.login}
      className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md text-sm font-medium transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <LogIn size={16} />
      <span>Connexion</span>
    </Link>
  )
}
