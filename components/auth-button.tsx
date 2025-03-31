"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createSupabaseClient } from "@/lib/supabase"

export function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuthStatus() {
      const supabase = createSupabaseClient()

      // Vérifier si l'utilisateur est connecté
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setIsLoggedIn(true)

        // Récupérer le rôle de l'utilisateur
        const { data: userRoleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (userRoleData) {
          setUserRole(userRoleData.role)
        }
      }

      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  if (isLoading) {
    return (
      <div className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        ...
      </div>
    )
  }

  if (isLoggedIn) {
    // Déterminer la destination en fonction du rôle
    let dashboardUrl = "/profile"

    if (userRole === "admin" || userRole === "validator") {
      dashboardUrl = "/admin/dashboard"
    }

    return (
      <Link
        href={dashboardUrl}
        className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-blue-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        Dashboard
      </Link>
    )
  }

  return (
    <Link
      href="/login"
      className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-green-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
    >
      Connexion
    </Link>
  )
}

