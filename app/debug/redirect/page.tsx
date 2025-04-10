"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function RedirectDebugPage() {
  const [cookies, setCookies] = useState<string>("")
  const [sessionInfo, setSessionInfo] = useState<string>("Chargement...")
  const [authState, setAuthState] = useState<string>("Vérification...")
  const searchParams = useSearchParams()

  useEffect(() => {
    // Afficher les cookies
    setCookies(document.cookie)

    // Vérifier l'état d'authentification côté client
    const checkAuthState = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setAuthState(`Erreur: ${error.message}`)
        } else if (data.session) {
          setAuthState(`Authentifié: ${data.session.user.email}`)
        } else {
          setAuthState("Non authentifié")
        }
      } catch (error) {
        setAuthState(`Erreur: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    // Tenter de récupérer les informations de session
    const checkSession = async () => {
      try {
        const response = await fetch("/api/debug/session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()
        setSessionInfo(JSON.stringify(data, null, 2))
      } catch (error) {
        setSessionInfo(`Erreur: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    checkAuthState()
    checkSession()
  }, [])

  return (
    <div className="p-8 bg-white border-4 border-black m-8">
      <h1 className="text-2xl font-bold mb-4">Débogage des redirections</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">État d'authentification (client)</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">{authState}</pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Paramètres d'URL</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
          {Object.fromEntries(searchParams.entries()).length > 0
            ? JSON.stringify(Object.fromEntries(searchParams.entries()), null, 2)
            : "Aucun paramètre d'URL"}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Cookies</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">{cookies || "Aucun cookie"}</pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Informations de session (serveur)</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">{sessionInfo}</pre>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded">
        <h2 className="text-lg font-bold">Liens de test:</h2>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            <a href="/" className="text-blue-600 underline">
              Page d'accueil (/)
            </a>
          </li>
          <li>
            <a href="/login" className="text-blue-600 underline">
              Page de login (/login)
            </a>
          </li>
          <li>
            <a href="/admin/dashboard" className="text-blue-600 underline">
              Dashboard admin (/admin/dashboard)
            </a>
          </li>
          <li>
            <a href="/profile" className="text-blue-600 underline">
              Profil utilisateur (/profile)
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
