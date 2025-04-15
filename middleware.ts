import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Créer une réponse initiale que nous pouvons modifier
  const res = NextResponse.next()

  // Vérifier si la route commence par /debug
  if (req.nextUrl.pathname.startsWith("/debug")) {
    // En production, bloquer l'accès aux routes de débogage
    if (process.env.NODE_ENV === "production") {
      // Rediriger vers la page 404 ou la page d'accueil
      return NextResponse.redirect(new URL("/404", req.url))
    }

    // En développement, ajouter un en-tête d'avertissement
    const debugResponse = NextResponse.next()
    debugResponse.headers.set("X-Debug-Mode", "Enabled")
    return debugResponse
  }

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
  // Ignorer les routes API dans l'App Router
  const isApiRoute = req.nextUrl.pathname.startsWith("/app/api")

  // Ignorer le traitement pour les routes API
  if (isApiRoute) {
    return res
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && isProtectedRoute) {
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
      // Vérifier si l'utilisateur a le rôle admin ou validator
      const { data: userRoleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (error) {
        console.error("Middleware: Erreur lors de la vérification des rôles:", error)
        // Rediriger vers la page d'accueil en cas d'erreur pour plus de sécurité
        return NextResponse.redirect(new URL("/", req.url))
      }

      if (!userRoleData || (userRoleData.role !== "admin" && userRoleData.role !== "validator")) {
        // Rediriger vers la page d'accueil si l'utilisateur n'a pas les droits
        return NextResponse.redirect(new URL("/", req.url))
      }
    } catch (error) {
      console.error("Middleware: Erreur lors de la vérification des rôles:", error)
      // Rediriger vers la page d'accueil en cas d'erreur pour plus de sécurité
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

// Mettre à jour le matcher pour inclure les nouvelles routes API
export const config = {
  matcher: [
    "/admin/:path*",
    "/profile",
    "/dashboard",
    "/login",
    "/debug/:path*",
    // Exclure les routes API de l'App Router
    "/((?!app/api/).)*",
  ],
}
