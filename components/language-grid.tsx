'use client';

import type React from 'react';
import { LanguageCard } from './language-card';
import type { Language } from '@/types/models/language';
import { useRouter } from 'next/navigation';
import type { SearchParamsType } from '@/types/dto/search-params';

interface LanguageGridProps {
  languages: Language[];
  totalCount: number;
  searchParams: SearchParamsType;
}

export const LanguageGrid: React.FC<LanguageGridProps> = ({
  languages,
  totalCount,
  searchParams,
}) => {
  const router = useRouter();

  // Extraire les paramètres de recherche
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const type = typeof searchParams.type === 'string' ? searchParams.type : 'all';

  // Fonction pour mettre à jour les filtres
  const updateFilters = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();

    // Conserver les paramètres existants
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') {
        params.set(key, value);
      }
    });

    // Ajouter/remplacer les nouveaux paramètres
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`/languages?${params.toString()}`);
  };

  return (
    <div>
      {languages.length === 0 ? (
        <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xl">Aucun langage ne correspond à vos critères.</p>
          <p>Essayez de modifier vos filtres ou votre recherche.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {languages.map(language => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      )}
    </div>
  );
};
