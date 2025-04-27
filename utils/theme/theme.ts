import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine les classes CSS avec clsx et tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Obtient la couleur de badge pour un type de langage
 */
export function getTypeBadgeColor(type: string): string {
  const typeColors: Record<string, string> = {
    Compilé: 'bg-blue-600',
    Interprété: 'bg-green-600',
    Hybride: 'bg-purple-600',
    Fonctionnel: 'bg-orange-600',
    'Orienté objet': 'bg-pink-600',
    Autre: 'bg-gray-600',
  };

  return typeColors[type] || typeColors['Autre'];
}
