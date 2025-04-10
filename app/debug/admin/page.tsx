"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AdminDebugPage() {
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const supabase = createClientComponentClient()

        // Vérifier si l'utilisateur est connecté
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          setError("Vous n'êtes pas connecté")
          return
        }

        setUser(session.user)

        // Vérifier le rôle de l'utilisateur directement
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (roleError) {
          setError(`Erreur lors de la récupération du rôle: ${roleError.message}`)
        } else {
          setUserRole(roleData?.role || null)
        }

        // Récupérer les informations de débogage depuis l'API
        const response = await fetch("/api/debug/role")
        const data = await response.json()

        setDebugInfo(data)
      } catch (err) {
        setError(`Une erreur est survenue: ${err instanceof Error ? err.message : String(err)}`)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleTestAdminAccess = () => {
    window.location.href = "/admin/dashboard"
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Débogage des accès administrateur</h1>

      <Card>
        <CardHeader>
          <CardTitle>État d'authentification</CardTitle>
          <CardDescription>Informations sur votre compte et vos autorisations</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 p-4 rounded-md">{error}</div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Utilisateur</h3>
                <p>ID: {user?.id}</p>
                <p>Email: {user?.email}</p>
              </div>

              <div>
                <h3 className="font-bold">Rôle</h3>
                <p>Rôle actuel: {userRole || "Non défini"}</p>
                <p className="text-sm text-gray-500">
                  {userRole === "admin"
                    ? "Vous avez les droits d'administration"
                    : "Vous n'avez pas les droits d'administration"}
                </p>
              </div>

              {debugInfo && (
                <div>
                  <h3 className="font-bold">Informations de débogage</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60 text-xs">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleTestAdminAccess}>Tester l'accès au tableau de bord admin</Button>
        </CardFooter>
      </Card>

      <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-md">
        <h2 className="text-lg font-bold">Liens utiles</h2>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            <a href="/" className="text-blue-600 underline">
              Page d'accueil (/)
            </a>
          </li>
          <li>
            <a href="/admin/dashboard" className="text-blue-600 underline">
              Dashboard admin (/admin/dashboard)
            </a>
          </li>
          <li>
            <a href="/debug/redirect" className="text-blue-600 underline">
              Page de débogage des redirections (/debug/redirect)
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
