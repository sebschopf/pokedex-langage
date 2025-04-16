"use client"

import type React from "react"
import type { UserRoleType } from "@/lib/client/permissions"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  // Ajouter un log pour voir si la page est rechargée en boucle
  useEffect(() => {
    console.log("Page de login chargée")
    console.log("Paramètres d'URL:", Object.fromEntries(searchParams.entries()))
  }, [searchParams])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      console.log("Tentative de connexion avec:", email)

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("Connexion réussie")

      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        // Vérifier le rôle de l'utilisateur pour rediriger vers le bon dashboard
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()
          const role = userRole?.role as UserRoleType | undefined
          console.log("Rôle de l'utilisateur:", role)

          // Récupérer l'URL de redirection depuis les paramètres d'URL
          const redirectedFrom = searchParams.get("redirectedFrom")

          if (redirectedFrom) {
            // Si l'utilisateur a été redirigé depuis une page protégée, le renvoyer à cette page
            console.log("Redirection vers:", redirectedFrom)
            router.push(redirectedFrom)
          } else if (role === "admin" || role === "validator") {
            // Si c'est un admin ou validator, rediriger vers le dashboard admin
            console.log("Redirection vers /admin/dashboard")
            router.push("/admin/dashboard")
          } else {
            // Pour les utilisateurs normaux, rediriger vers la page principale
            console.log("Redirection vers /")
            router.push("/")
          }
        } else {
          // Si pas de session (cas improbable après connexion réussie), rediriger vers la page principale
          console.log("Pas de session, redirection vers /")
          router.push("/")
        }
      })
    } catch (error: any) {
      console.error("Erreur de connexion:", error.message)
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      toast({
        title: "Inscription réussie",
        description: "Veuillez vérifier votre email pour confirmer votre compte.",
      })
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center py-12">
      {/* Ajouter un message de débogage visible */}
      <div className="bg-yellow-100 p-4 mb-4 border-2 border-yellow-400 max-w-md">
        <p className="font-bold">Mode débogage:</p>
        <p>URL actuelle: {typeof window !== "undefined" ? window.location.href : ""}</p>
        <p>Paramètres: {JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Pokedex Dev</h1>
          <p className="text-lg font-bold">Connectez-vous ou créez un compte pour continuer</p>
        </div>

        {/* Tabs néo-brutalistes */}
        <div className="w-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Tabs Header */}
          <div className="grid w-full grid-cols-2 border-b-4 border-black">
            <button
              onClick={() => setActiveTab("signin")}
              className={`py-4 font-black text-lg uppercase transition-colors ${
                activeTab === "signin" ? "bg-yellow-300" : "bg-white hover:bg-gray-100"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`py-4 font-black text-lg uppercase transition-colors ${
                activeTab === "signup" ? "bg-yellow-300" : "bg-white hover:bg-gray-100"
              } border-l-4 border-black`}
            >
              Inscription
            </button>
          </div>

          {/* Tabs Content */}
          <div className="p-6">
            {activeTab === "signin" ? (
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black">Connexion</h2>
                  <p className="text-base font-medium">Entrez vos identifiants pour vous connecter</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-base font-bold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 border-4 border-black font-medium text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-base font-bold">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border-4 border-black font-medium text-base"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:bg-white flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Connexion en cours...
                      </>
                    ) : (
                      "Se connecter"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGitHubSignIn}
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gray-200 border-4 border-black text-black font-black text-lg uppercase hover:bg-gray-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:bg-gray-200 flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Chargement...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Se connecter avec GitHub
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black">Inscription</h2>
                  <p className="text-base font-medium">Créez un compte pour accéder à toutes les fonctionnalités</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-base font-bold">
                      Email
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 border-4 border-black font-medium text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-base font-bold">
                      Mot de passe
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border-4 border-black font-medium text-base"
                    />
                    <p className="text-sm font-medium">Le mot de passe doit contenir au moins 6 caractères</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-green-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:hover:bg-white flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Inscription en cours...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
