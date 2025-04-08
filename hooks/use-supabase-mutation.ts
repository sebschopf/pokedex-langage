//hooks/use-supabase-mutation.ts
"use client"

import { useState } from "react"
import { createSupabaseClient } from "@/lib/supabase"
import { useToast } from "./use-toast"

// Type générique pour les options de mutation
export interface MutationOptions<T> {
  table: string
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
  showToast?: boolean
}

// Type pour les options d'insertion
export interface InsertOptions<T> extends MutationOptions<T> {
  data: Partial<T> | Partial<T>[]
}

// Type pour les options de mise à jour
export interface UpdateOptions<T> extends MutationOptions<T> {
  data: Partial<T>
  match: Record<string, any>
}

// Type pour les options de suppression
export interface DeleteOptions<T> extends MutationOptions<T> {
  match: Record<string, any>
}

// Hook pour les mutations Supabase avec gestion des toasts
export function useSupabaseMutation<T = any>() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  // Fonction pour insérer des données
  const insert = async ({
    table,
    data,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showToast = true,
  }: InsertOptions<T>) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      const { data: result, error } = await supabase.from(table).insert(data).select()

      if (error) throw error

      if (showToast && successMessage) {
        toast({
          title: "Succès",
          description: successMessage,
          variant: "default",
        })
      }

      if (onSuccess) onSuccess(result as unknown as T)

      return result
    } catch (err) {
      const error = err as Error
      setError(error)

      if (showToast) {
        toast({
          title: "Erreur",
          description: errorMessage || error.message,
          variant: "destructive",
        })
      }

      if (onError) onError(error)

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour mettre à jour des données
  const update = async ({
    table,
    data,
    match,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showToast = true,
  }: UpdateOptions<T>) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      let query = supabase.from(table).update(data)

      // Appliquer les conditions de correspondance
      Object.entries(match).forEach(([key, value]) => {
        query = query.eq(key, value)
      })

      const { data: result, error } = await query.select()

      if (error) throw error

      if (showToast && successMessage) {
        toast({
          title: "Succès",
          description: successMessage,
          variant: "default",
        })
      }

      if (onSuccess) onSuccess(result as unknown as T)

      return result
    } catch (err) {
      const error = err as Error
      setError(error)

      if (showToast) {
        toast({
          title: "Erreur",
          description: errorMessage || error.message,
          variant: "destructive",
        })
      }

      if (onError) onError(error)

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour supprimer des données
  const remove = async ({
    table,
    match,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showToast = true,
  }: DeleteOptions<T>) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      let query = supabase.from(table).delete()

      // Appliquer les conditions de correspondance
      Object.entries(match).forEach(([key, value]) => {
        query = query.eq(key, value)
      })

      const { data: result, error } = await query.select()

      if (error) throw error

      if (showToast && successMessage) {
        toast({
          title: "Succès",
          description: successMessage,
          variant: "default",
        })
      }

      if (onSuccess) onSuccess(result as unknown as T)

      return result
    } catch (err) {
      const error = err as Error
      setError(error)

      if (showToast) {
        toast({
          title: "Erreur",
          description: errorMessage || error.message,
          variant: "destructive",
        })
      }

      if (onError) onError(error)

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    insert,
    update,
    remove,
  }
}

