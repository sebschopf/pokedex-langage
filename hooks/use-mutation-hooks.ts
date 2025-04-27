'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './use-query-hooks';
import { toast } from '@/hooks/use-toast';

// Types
interface Language {
  id: string;
  name: string;
  slug: string;
  year_created?: number | null;
  creator?: string | null;
  short_description?: string | null;
  description?: string | null;
  type?: string | null;
  used_for?: string | null;
  is_open_source?: boolean | null;
  logo_path?: string | null;
}

// API functions
async function createLanguage(data: Omit<Language, 'id'>): Promise<Language> {
  const response = await fetch('/api/languages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la création du langage');
  }

  return response.json();
}

async function updateLanguage(data: Partial<Language> & { id: string }): Promise<Language> {
  const response = await fetch(`/api/languages/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la mise à jour du langage');
  }

  return response.json();
}

async function deleteLanguage(id: string): Promise<void> {
  const response = await fetch(`/api/languages/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la suppression du langage');
  }
}

async function submitLanguageSuggestion(data: any): Promise<void> {
  const response = await fetch('/api/suggestions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la soumission de la suggestion');
  }
}

// Hooks
export function useCreateLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
      toast({
        title: 'Succès',
        description: 'Le langage a été créé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLanguage,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languageDetail, data.id] });
      toast({
        title: 'Succès',
        description: 'Le langage a été mis à jour avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.languages] });
      toast({
        title: 'Succès',
        description: 'Le langage a été supprimé avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useSubmitLanguageSuggestion() {
  return useMutation({
    mutationFn: submitLanguageSuggestion,
    onSuccess: () => {
      toast({
        title: 'Succès',
        description: 'Votre suggestion a été soumise avec succès',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
