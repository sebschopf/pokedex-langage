/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
import type { Database } from '@/types';

// Singleton pour le client côté serveur
let globalSupabaseClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Crée ou récupère une instance du client Supabase pour le serveur
 * Utilise une variable globale pour garantir une seule instance par serveur
 * @returns Client Supabase
 */
export const createServerClient = cache(() => {
  // Si le client existe déjà, le retourner
  if (globalSupabaseClient) {
    return globalSupabaseClient;
  }

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Création du client Supabase serveur...`);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!supabaseKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');

    const errorMsg = `Variables d'environnement Supabase manquantes: ${missingVars.join(', ')}`;
    console.error(`[${timestamp}] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  try {
    globalSupabaseClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    
    return globalSupabaseClient;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error(`[${timestamp}] Erreur lors de la création du client Supabase:`, errorMessage);
    throw error;
  }
});

// Même approche pour le client admin
let globalAdminClient: ReturnType<typeof createClient<Database>> | null = null;

export const createAdminClient = cache(() => {
  if (globalAdminClient) {
    return globalAdminClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Les variables d'environnement Supabase ne sont pas définies");
  }

  globalAdminClient = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  return globalAdminClient;
});