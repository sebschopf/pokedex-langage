import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Créer une réponse initiale que nous pouvons modifier
  const res = NextResponse.next()

  // Créer un client Supabase spécifique pour le middleware
  const supabase = createMiddlewareClient({ req, res })

  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Définir les routes protégées et publiques
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  const isProfileRoute = req.nextUrl.pathname === "/profile" || req.nextUrl.pathname === "/dashboard"
  const isProtectedRoute = isAdminRoute || isProfileRoute
  const isLoginRoute = req.nextUrl.pathname === "/login"
  const isDebugRoute = req.nextUrl.pathname.startsWith("/debug")

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && isProtectedRoute) {
    console.log("Middleware: Redirection vers login - Utilisateur non connecté")

    // Stocker l'URL d'origine pour la redirection après connexion
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (session && isLoginRoute) {
    // Rediriger vers la page d'accueil ou la page demandée précédemment
    const redirectedFrom = req.nextUrl.searchParams.get("redirectedFrom")
    if (redirectedFrom && redirectedFrom !== "/login") {
      return NextResponse.redirect(new URL(redirectedFrom, req.url))
    }
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /admin
  if (session && isAdminRoute) {
    try {
      console.log("Middleware: Vérification des droits admin pour", session.user.id)

      // Vérifier si l'utilisateur a le rôle admin ou validator
      const { data: userRoleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      console.log("Middleware: Résultat de la vérification des rôles:", { userRoleData, error })

      if (error) {
        console.error("Middleware: Erreur lors de la vérification des rôles:", error)
        // Ne pas rediriger en cas d'erreur de requête, permettre l'accès
        // pour éviter les faux positifs
        return res
      }

      if (!userRoleData || (userRoleData.role !== "admin" && userRoleData.role !== "validator")) {
        console.log("Middleware: Accès refusé - Rôle insuffisant:", userRoleData?.role)

        // Rediriger vers la page d'accueil si l'utilisateur n'a pas les droits
        return NextResponse.redirect(new URL("/", req.url))
      }

      console.log("Middleware: Accès autorisé pour", userRoleData.role)
    } catch (error) {
      console.error("Middleware: Erreur lors de la vérification des rôles:", error)

      // En cas d'erreur, permettre l'accès pour éviter les faux positifs
      return res
    }
  }

  // Permettre l'accès aux routes de débogage sans vérification supplémentaire
  if (isDebugRoute) {
    return res
  }

  return res
}

// Limiter le middleware aux routes spécifiques
export const config = {
  matcher: ["/admin/:path*", "/profile", "/dashboard", "/login", "/debug/:path*"],
}
