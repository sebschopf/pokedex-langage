"use client"

import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useRef } from "react"

interface QueryProviderTProps {
  children: ReactNode
}

export function Providers({ children }: QueryProviderTProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 60 * 60 * 1000, // 1 heure
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    })
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
