'use client';

import { useQuery } from '@tanstack/react-query';
import type { Language } from '@/types/models';

// Clés de cache pour React Query
export const QUERY_KEYS = {
  languages: 'languages',
  languageDetail: (id: string) => ['language', id],
  frameworks: (languageId: string) => ['frameworks', languageId],
};

/**
 * Hook pour récupérer les langages avec mise en cache
 */
export function useCachedLanguages() {
  return useQuery<Language[]>({
    queryKey: [QUERY_KEYS.languages],
    queryFn: async () => {
      const response = await fetch('/api/languages');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des langages');
      }
      return response.json();
    },
  });
}
