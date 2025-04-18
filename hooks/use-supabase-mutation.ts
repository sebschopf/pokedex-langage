"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import type { PostgrestError } from "@supabase/supabase-js"
import type { Database } from "@/types/database-types"

// Type pour les noms de tables valides
type TableName = keyof Database["public"]["Tables"]

// Types pour les opérations
type Operation = "insert" | "update" | "upsert" | "delete"

// Types pour les données de table
type TableData<T extends TableName> = Database["public"]["Tables"][T]
type InsertData<T extends TableName> = TableData<T>["Insert"]
type UpdateData<T extends TableName> = TableData<T>["Update"]
type Row<T extends TableName> = TableData<T>["Row"]

// Type générique pour les résultats des opérations Supabase
type PostgrestResult = {
  data: any
  error: PostgrestError | null
  count?: number
  status?: number
  statusText?: string
}

// Options pour useSupabaseMutation
export interface MutationOptions<T extends TableName> {
  table: T
  operation: Operation
  onSuccess?: (data: any) => void
  onError?: (error: PostgrestError) => void
}

export interface InsertOptions<T extends TableName> extends Omit<MutationOptions<T>, "operation"> {}
export interface UpdateOptions<T extends TableName> extends Omit<MutationOptions<T>, "operation"> {}
export interface DeleteOptions<T extends TableName> extends Omit<MutationOptions<T>, "operation"> {}

// Paramètres pour les mutations
interface InsertParams<T extends TableName> {
  data: InsertData<T>
  filters?: never
}

interface UpdateParams<T extends TableName> {
  data: UpdateData<T>
  filters: Record<string, any>
}

interface UpsertParams<T extends TableName> {
  data: InsertData<T>
  filters?: never
}

interface DeleteParams {
  data?: never
  filters: Record<string, any>
}

type MutationParams<T extends TableName, O extends Operation> = O extends "insert"
  ? InsertParams<T>
  : O extends "update"
    ? UpdateParams<T>
    : O extends "upsert"
      ? UpsertParams<T>
      : O extends "delete"
        ? DeleteParams
        : never

// Fonctions d'aide typées pour les opérations Supabase
function insertData<T extends TableName>(
  supabase: ReturnType<typeof createBrowserClient>,
  table: T,
  data: InsertData<T>,
) {
  return supabase.from(table).insert(data as any)
}

function updateData<T extends TableName>(
  supabase: ReturnType<typeof createBrowserClient>,
  table: T,
  data: UpdateData<T>,
) {
  return supabase.from(table).update(data as any)
}

function upsertData<T extends TableName>(
  supabase: ReturnType<typeof createBrowserClient>,
  table: T,
  data: InsertData<T>,
) {
  return supabase.from(table).upsert(data as any)
}

// Hook useSupabaseMutation
export function useSupabaseMutation<T extends TableName, O extends Operation = Operation>({
  table,
  operation,
  onSuccess,
  onError,
}: MutationOptions<T> & { operation: O }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const mutate = async (params: MutationParams<T, O>) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createBrowserClient()
      let query: any

      switch (operation) {
        case "insert":
          query = insertData(supabase, table, (params as InsertParams<T>).data)
          break
        case "update":
          if (!params.filters) {
            throw new Error("Filters are required for update operations")
          }
          query = updateData(supabase, table, (params as UpdateParams<T>).data)

          // Appliquer les filtres
          Object.entries(params.filters).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
          break
        case "upsert":
          query = upsertData(supabase, table, (params as UpsertParams<T>).data)
          break
        case "delete":
          if (!params.filters) {
            throw new Error("Filters are required for delete operations")
          }
          query = supabase.from(table).delete()

          // Appliquer les filtres
          Object.entries(params.filters).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
          break
        default:
          throw new Error(`Unsupported operation: ${operation}`)
      }

      const { data: result, error: supabaseError } = await query.select()

      if (supabaseError) {
        setError(supabaseError)
        if (onError) onError(supabaseError)
        return null
      }

      if (onSuccess) onSuccess(result)
      return result
    } catch (err) {
      const postgrestError = err as PostgrestError
      setError(postgrestError)
      if (onError) onError(postgrestError)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Pour la compatibilité avec le code existant
  // Ces méthodes sont typées de manière plus spécifique
  const insert = async (data: InsertData<T>) => {
    return mutate({ data } as MutationParams<T, O>)
  }

  const update = async (data: UpdateData<T>, filters: Record<string, any>) => {
    return mutate({ data, filters } as MutationParams<T, O>)
  }

  const remove = async (filters: Record<string, any>) => {
    return mutate({ filters } as MutationParams<T, O>)
  }

  return {
    mutate,
    insert,
    update,
    remove,
    isLoading,
    error,
  }
}

// Hooks spécialisés pour la compatibilité avec le code existant
export function useInsertMutation<T extends TableName>(options: InsertOptions<T>) {
  return useSupabaseMutation<T, "insert">({ ...options, operation: "insert" })
}

export function useUpdateMutation<T extends TableName>(options: UpdateOptions<T>) {
  return useSupabaseMutation<T, "update">({ ...options, operation: "update" })
}

export function useDeleteMutation<T extends TableName>(options: DeleteOptions<T>) {
  return useSupabaseMutation<T, "delete">({ ...options, operation: "delete" })
}
