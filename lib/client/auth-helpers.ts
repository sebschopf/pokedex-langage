'use client';

import { createBrowserClient } from '@/lib/client/supabase';
import { toast } from '@/hooks/use-toast';

/**
 * Fonction qui gère automatiquement le rafraîchissement des tokens
 * À utiliser dans les composants client qui font des requêtes authentifiées
 */
export async function withTokenRefresh<T>(callback: () => Promise<T>): Promise<T> {
  const supabase = createBrowserClient();

  try {
    // Tenter d'exécuter la fonction callback
    return await callback();
  } catch (error: any) {
    // Vérifier si l'erreur est due à un token expiré
    if (
      error.message?.includes('JWT expired') ||
      error.message?.includes('invalid token') ||
      error.status === 401
    ) {
      try {
        // Tenter de rafraîchir la session
        const { data, error: refreshError } = await supabase.auth.refreshSession();

        if (refreshError) throw refreshError;

        if (data.session) {
          // Session rafraîchie avec succès, réessayer l'opération
          return await callback();
        } else {
          // Pas de nouvelle session, rediriger vers la connexion
          toast({
            title: 'Session expirée',
            description: 'Veuillez vous reconnecter pour continuer.',
            variant: 'destructive',
          });

          // Rediriger vers la page de connexion
          window.location.href = `/login?redirectedFrom=${encodeURIComponent(window.location.pathname)}`;
          throw new Error('Session expirée');
        }
      } catch (refreshError) {
        // Échec du rafraîchissement, rediriger vers la connexion
        toast({
          title: 'Session expirée',
          description: 'Veuillez vous reconnecter pour continuer.',
          variant: 'destructive',
        });

        // Rediriger vers la page de connexion
        window.location.href = `/login?redirectedFrom=${encodeURIComponent(window.location.pathname)}`;
        throw error;
      }
    }

    // Si ce n'est pas une erreur d'authentification, la propager
    throw error;
  }
}

/**
 * Vérifie si l'utilisateur est connecté côté client
 * @returns Promise<boolean> indiquant si l'utilisateur est connecté
 */
export async function isAuthenticated(): Promise<boolean> {
  const supabase = createBrowserClient();
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

/**
 * Déconnecte l'utilisateur
 * @returns Promise<void>
 */
export async function signOut(): Promise<void> {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
  window.location.href = '/';
}
