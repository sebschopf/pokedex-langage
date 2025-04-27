/**
 * Obtient la couleur de badge pour un type de langage
 * @param type Type de langage
 * @returns Classe CSS pour la couleur du badge
 */
export function getTypeBadgeColor(type: string | null | undefined): string {
  if (!type) return 'bg-gray-500 dark:bg-gray-600';

  const normalizedType = type.toLowerCase();

  switch (normalizedType) {
    case 'frontend':
      return 'bg-blue-500 dark:bg-blue-600';
    case 'backend':
      return 'bg-green-500 dark:bg-green-600';
    case 'fullstack':
      return 'bg-purple-500 dark:bg-purple-600';
    case 'mobile':
      return 'bg-orange-500 dark:bg-orange-600';
    case 'data':
      return 'bg-red-500 dark:bg-red-600';
    case 'compiled':
      return 'bg-indigo-500 dark:bg-indigo-600';
    case 'interpreted':
      return 'bg-yellow-500 dark:bg-yellow-600';
    case 'scripting':
      return 'bg-pink-500 dark:bg-pink-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
}
