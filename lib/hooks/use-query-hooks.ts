"use client"

import { useQuery } from "@tanstack/react-query"

// Clés de requête centralisées
export const QUERY_KEYS = {
  languages: "languages",
  languageDetail: (id: string | number) => ["language", id.toString()],
  frameworks: (languageId: string | number) => ["frameworks", languageId.toString()],
  profile: (userId: string) => ["profile", userId],
}

/**
 * Hook pour récupérer tous les langages
 */
export function useLanguages() {
  return useQuery({
    queryKey: [QUERY_KEYS.languages],
    queryFn: async () => {
      const response = await fetch("/api/languages")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des langages")
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook pour récupérer les détails d'un langage spécifique
 */
export function useLanguageDetail(id: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.languageDetail(id),
    queryFn: async () => {
      const response = await fetch(`/api/languages/${id}`)
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du langage ${id}`)
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook pour récupérer les frameworks d'un langage spécifique
 */
export function useFrameworks(languageId: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.frameworks(languageId),
    queryFn: async () => {
      const response = await fetch(`/api/languages/${languageId}/frameworks`)
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des frameworks pour le langage ${languageId}`)
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook pour récupérer le profil d'un utilisateur
 */
export function useProfile(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.profile(userId),
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/profile`)
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du profil de l'utilisateur ${userId}`)
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
