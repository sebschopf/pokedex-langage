import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname === "/profile")) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /admin
  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    // Vérifier si l'utilisateur a le rôle admin ou validator
    const { data: userRoleData } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

    // Si l'utilisateur n'a pas le rôle admin ou validator, le rediriger vers la page d'accueil
    if (!userRoleData || (userRoleData.role !== "admin" && userRoleData.role !== "validator")) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /login ou /register
  if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return response
}

// Spécifier les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ["/admin/:path*", "/profile", "/login", "/register"],
}
