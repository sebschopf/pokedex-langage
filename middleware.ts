import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  // et essaie d'accéder à une page protégée
  if (!session && (
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/admin")
  )) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Vérifier les autorisations pour les pages d'administration
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (session) {
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", session.user.id)
        .single()
      
      // Rediriger vers la page d'accueil si l'utilisateur n'a pas les droits d'administration
      if (!userRole || (userRole.role !== "admin" && userRole.role !== "validator")) {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }
  }
  
  return res
}

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
}