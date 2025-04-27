import { withTokenRefresh } from './auth-helpers';
import type { Language } from '@/types';

// ===== LANGAGES =====

export async function fetchLanguages() {
  return withTokenRefresh(async () => {
    const response = await fetch('/api/languages');
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la récupération des langages');
    }
    return await response.json();
  });
}

export async function fetchLanguageById(id: string) {
  return withTokenRefresh(async () => {
    const response = await fetch(`/api/languages/${id}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la récupération du langage');
    }
    return await response.json();
  });
}

export async function fetchLanguageBySlug(slug: string) {
  return withTokenRefresh(async () => {
    const response = await fetch(`/api/languages/slug/${slug}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la récupération du langage');
    }
    return await response.json();
  });
}

export async function createLanguageClient(languageData: Partial<Language>) {
  return withTokenRefresh(async () => {
    const response = await fetch('/api/languages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(languageData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la création du langage');
    }

    return await response.json();
  });
}

export async function updateLanguageClient(id: string, languageData: Partial<Language>) {
  return withTokenRefresh(async () => {
    const response = await fetch(`/api/languages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(languageData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la mise à jour du langage');
    }

    return await response.json();
  });
}

export async function deleteLanguageClient(id: string) {
  return withTokenRefresh(async () => {
    const response = await fetch(`/api/languages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Erreur lors de la suppression du langage');
    }

    return true;
  });
}

// Autres fonctions...
