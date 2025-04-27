'use client';

import type React from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

interface ResponsiveDataViewProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderMobileItem?: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
  isLoading?: boolean;
  className?: string;
  gridClassName?: string;
  listClassName?: string;
}

export function ResponsiveDataView<T>({
  data,
  renderItem,
  renderMobileItem,
  emptyMessage = 'Aucune donnée disponible',
  loadingMessage = 'Chargement...',
  isLoading = false,
  className = '',
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  listClassName = 'space-y-4',
}: ResponsiveDataViewProps<T>) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <p className="text-gray-500">{loadingMessage}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={`flex justify-center items-center p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${className}`}
      >
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={isMobile ? listClassName : gridClassName}>
      {data.map((item, index) =>
        isMobile && renderMobileItem ? renderMobileItem(item, index) : renderItem(item, index),
      )}
    </div>
  );
}
