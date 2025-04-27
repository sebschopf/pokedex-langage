/**
 * Utilitaires pour la manipulation de chaînes
 */

export * from './string-utils';

// Au lieu de dupliquer la fonction getImageName, importons-la depuis le module image
export { getImageName } from '../image/get-image-name';

// Fonction pour obtenir la couleur du badge en fonction du type
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
      return 'bg-brand-yellow dark:bg-brand-yellow';
    case 'scripting':
      return 'bg-pink-500 dark:bg-pink-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
}
