'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { PostgrestError } from '@supabase/supabase-js';
import type { Database } from '@/types/database-types';

// Type pour les noms de tables valides
type TableName = keyof Database['public']['Tables'];

// Options pour useSupabaseQuery
interface UseSupabaseQueryOptions<T> {
  table: TableName;
  columns?: string;
  filters?: Record<string, any>;
  orderBy?: string;
  ascending?: boolean;
  limit?: number;
  single?: boolean;
  enabled?: boolean;
}

// Hook useSupabaseQuery
export function useSupabaseQuery<T = any>({
  table,
  columns = '*',
  filters = {},
  orderBy,
  ascending = true,
  limit,
  single = false,
  enabled = true,
}: UseSupabaseQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!enabled) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const supabase = createBrowserClient();
        let query = supabase.from(table).select(columns);

        // Appliquer les filtres
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });

        // Appliquer le tri
        if (orderBy) {
          query = query.order(orderBy, { ascending });
        }

        // Appliquer la limite
        if (limit) {
          query = query.limit(limit);
        }

        // Récupérer un seul élément ou plusieurs
        const { data: result, error: supabaseError } = single ? await query.single() : await query;

        if (isMounted) {
          if (supabaseError) {
            setError(supabaseError);
            setData(null);
          } else {
            setData(result as T);
            setError(null);
          }
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as PostgrestError);
          setData(null);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [table, columns, JSON.stringify(filters), orderBy, ascending, limit, single, enabled]);

  return { data, isLoading, error };
}
