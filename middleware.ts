import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { UserRoleType } from '@/types/models/user-role';

// Définir les routes protégées par rôle
const ROLE_PROTECTED_ROUTES = {
  admin: ['/admin', '/admin/languages', '/admin/frameworks', '/admin/users', '/admin/corrections'],
  validator: ['/admin/corrections', '/admin/proposals'],
  verified: ['/contribute', '/suggestions/create'],
  registered: ['/profile', '/dashboard', '/suggestions'],
};

// Vérifier si une route est protégée pour un rôle spécifique
function isRouteProtectedForRole(
  pathname: string,
  role: keyof typeof ROLE_PROTECTED_ROUTES,
): boolean {
  return ROLE_PROTECTED_ROUTES[role].some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function middleware(req: NextRequest) {
  // Créer une réponse initiale que nous pouvons modifier
  const res = NextResponse.next();

  // Créer un client Supabase spécifique pour le middleware
  const supabase = createMiddlewareClient({ req, res });

  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Ignorer les routes statiques et API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return res;
  }

  // Vérifier si la route est la page de login
  const isLoginRoute = pathname === '/login';

  // Si l'utilisateur est connecté et essaie d'accéder à la page de login
  if (session && isLoginRoute) {
    // Rediriger vers la page d'accueil ou la page demandée précédemment
    const redirectedFrom = req.nextUrl.searchParams.get('redirectedFrom');
    if (redirectedFrom && redirectedFrom !== '/login') {
      return NextResponse.redirect(new URL(redirectedFrom, req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Vérifier si l'utilisateur a besoin d'être authentifié pour cette route
  const requiresAuth = Object.values(ROLE_PROTECTED_ROUTES)
    .flat()
    .some(route => pathname === route || pathname.startsWith(`${route}/`));

  // Si la route nécessite une authentification et que l'utilisateur n'est pas connecté
  if (requiresAuth && !session) {
    // Stocker l'URL d'origine pour la redirection après connexion
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Si l'utilisateur est connecté, vérifier les permissions basées sur les rôles
  if (session) {
    try {
      // Récupérer le rôle de l'utilisateur
      const { data: userRoleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Middleware: Erreur lors de la vérification des rôles:', error);
        // Rediriger vers la page d'accueil en cas d'erreur pour plus de sécurité
        return NextResponse.redirect(new URL('/', req.url));
      }

      const userRole = (userRoleData?.role as UserRoleType) || 'registered';

      // Vérifier les routes admin
      if (isRouteProtectedForRole(pathname, 'admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // Vérifier les routes validator
      if (
        isRouteProtectedForRole(pathname, 'validator') &&
        userRole !== 'admin' &&
        userRole !== 'validator'
      ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // Vérifier les routes verified
      if (
        isRouteProtectedForRole(pathname, 'verified') &&
        !['admin', 'validator', 'verified'].includes(userRole)
      ) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // Vérifier les routes registered (toutes les routes protégées restantes)
      if (isRouteProtectedForRole(pathname, 'registered') && userRole === 'anonymous') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      console.error('Middleware: Erreur lors de la vérification des rôles:', error);
      // Rediriger vers la page d'accueil en cas d'erreur pour plus de sécurité
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

// Mettre à jour le matcher pour inclure toutes les routes pertinentes
export const config = {
  matcher: [
    // Routes protégées
    '/admin/:path*',
    '/profile',
    '/dashboard',
    '/suggestions/:path*',
    '/contribute/:path*',
    // Routes d'authentification
    '/login',
    '/register',
    '/reset-password',
    // Page d'erreur personnalisée
    '/unauthorized',
  ],
};
