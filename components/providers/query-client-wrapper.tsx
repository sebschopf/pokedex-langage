"use client"

import type { ReactNode } from "react"
import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/lib/hooks/use-query-hooks"

// Wrapper pour useQuery qui peut être utilisé dans les composants serveur
export function QueryClientWrapper<TData, TError>({
  children,
  queryKey,
  queryFn,
  options,
}: {
  children: (data: TData | undefined, isLoading: boolean, error: TError | null) => ReactNode
  queryKey: string[]
  queryFn: () => Promise<TData>
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">
}) {
  const { data, isLoading, error } = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  })

  return <>{children(data, isLoading, error)}</>
}

// Wrapper pour useMutation qui peut être utilisé dans les composants serveur
export function MutationClientWrapper<TData, TVariables, TError>({
  children,
  mutationFn,
  options,
}: {
  children: (
    mutate: (variables: TVariables) => void,
    isPending: boolean,
    error: TError | null,
    data: TData | undefined,
  ) => ReactNode
  mutationFn: (variables: TVariables) => Promise<TData>
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
}) {
  const { mutate, isPending, error, data } = useMutation<TData, TError, TVariables>({
    mutationFn,
    ...options,
  })

  return <>{children(mutate, isPending, error, data)}</>
}

// Export des hooks spécifiques
export function LanguagesQueryWrapper({
  children,
}: {
  children: (languages: any[] | undefined, isLoading: boolean, error: Error | null) => ReactNode
}) {
  return (
    <QueryClientWrapper
      queryKey={[QUERY_KEYS.languages]}
      queryFn={async () => {
        const response = await fetch("/api/languages")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des langages")
        }
        return response.json()
      }}
    >
      {children}
    </QueryClientWrapper>
  )
}
