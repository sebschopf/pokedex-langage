'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // État local pour les filtres
  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [usageMin, setUsageMin] = useState(searchParams.get('usageMin') || '0');
  const [sort, setSort] = useState(searchParams.get('sort') || 'name');
  const [openSource, setOpenSource] = useState(searchParams.get('openSource') || '');

  // Mettre à jour les filtres lorsque les paramètres d'URL changent
  useEffect(() => {
    setType(searchParams.get('type') || 'all');
    setUsageMin(searchParams.get('usageMin') || '0');
    setSort(searchParams.get('sort') || 'name');
    setOpenSource(searchParams.get('openSource') || '');
  }, [searchParams]);

  // Appliquer les filtres
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Mettre à jour les paramètres
    if (type && type !== 'all') {
      params.set('type', type);
    } else {
      params.delete('type');
    }

    if (usageMin && usageMin !== '0') {
      params.set('usageMin', usageMin);
    } else {
      params.delete('usageMin');
    }

    if (sort && sort !== 'name') {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    if (openSource) {
      params.set('openSource', openSource);
    } else {
      params.delete('openSource');
    }

    // Réinitialiser la pagination
    params.delete('page');

    router.push(`/?${params.toString()}`);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    const params = new URLSearchParams();

    // Conserver uniquement la recherche
    const query = searchParams.get('query');
    if (query) {
      params.set('query', query);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-gray-800 dark:border-gray-600">
      <div className="flex items-center mb-4">
        <Filter className="mr-2" size={20} />
        <h2 className="text-xl font-bold">Filtres</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Type de langage */}
        <div>
          <label htmlFor="type" className="block font-medium mb-1">
            Type de langage
          </label>
          <select
            id="type"
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full p-2 border-2 border-black bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="all">Tous les types</option>
            <option value="Compilé">Compilé</option>
            <option value="Interprété">Interprété</option>
            <option value="Hybride">Hybride</option>
            <option value="Fonctionnel">Fonctionnel</option>
            <option value="Orienté objet">Orienté objet</option>
          </select>
        </div>

        {/* Taux d'utilisation minimum */}
        <div>
          <label htmlFor="usageMin" className="block font-medium mb-1">
            Taux d'utilisation min.
          </label>
          <select
            id="usageMin"
            value={usageMin}
            onChange={e => setUsageMin(e.target.value)}
            className="w-full p-2 border-2 border-black bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="0">Tous</option>
            <option value="1">Au moins 1%</option>
            <option value="5">Au moins 5%</option>
            <option value="10">Au moins 10%</option>
            <option value="20">Au moins 20%</option>
          </select>
        </div>

        {/* Tri */}
        <div>
          <label htmlFor="sort" className="block font-medium mb-1">
            Trier par
          </label>
          <select
            id="sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-full p-2 border-2 border-black bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="name">Nom (A-Z)</option>
            <option value="usage">Popularité</option>
            <option value="year">Année de création</option>
          </select>
        </div>

        {/* Open Source */}
        <div>
          <label htmlFor="openSource" className="block font-medium mb-1">
            Licence
          </label>
          <select
            id="openSource"
            value={openSource}
            onChange={e => setOpenSource(e.target.value)}
            className="w-full p-2 border-2 border-black bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Tous</option>
            <option value="true">Open Source</option>
            <option value="false">Propriétaire</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={resetFilters}
          className="py-2 px-4 border-2 border-black bg-gray-200 hover:bg-gray-300 font-bold transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
        >
          Réinitialiser
        </button>
        <button
          onClick={applyFilters}
          className="py-2 px-4 border-2 border-black bg-yellow-400 hover:bg-yellow-500 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}
