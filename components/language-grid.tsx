"use client"

import type { Language } from "@/types"
import { LanguageCard } from "@/components/language-card"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface LanguageGridProps {
  languages: Language[]
}

export function LanguageGrid({ languages }: LanguageGridProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          setIsLoggedIn(true)

          // Récupérer le rôle de l'utilisateur
          try {
            const { data: userRoleData } = await supabase
              .from("user_roles")
              .select("role")
              .eq("id", session.user.id)
              .single()

            if (userRoleData) {
              setUserRole(userRoleData.role)
            }
          } catch (error) {
            console.error("Erreur lors de la récupération du rôle:", error)
          }
        } else {
          setIsLoggedIn(false)
          setUserRole(null)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()

    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        setIsLoggedIn(true)
        // Récupérer le rôle après connexion
        supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) setUserRole(data.role)
          })
      } else if (event === "SIGNED_OUT") {
        setIsLoggedIn(false)
        setUserRole(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  // Vérifier si l'utilisateur peut modifier (admin ou validator)
  const canEdit = isLoggedIn && (userRole === "admin" || userRole === "validator")

  if (!languages || languages.length === 0) {
    return (
      <div className="text-center p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-xl">Aucun langage trouvé.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Langages de programmation</h2>
        {canEdit && (
          <Link
            href="/admin/languages/new"
            className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black text-black font-bold hover:bg-green-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <Plus size={18} />
            Ajouter un langage
          </Link>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <div key={language.id} className="relative group">
            <LanguageCard language={language} />

            {canEdit && (
              <Link
                href={`/admin/languages/edit/${language.id}`}
                className="absolute top-3 right-3 p-2 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-300"
                aria-label={`Modifier ${language.name}`}
              >
                <Edit size={16} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
