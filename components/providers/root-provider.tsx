"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import ScrollToTop from "@/components/scroll-to-top"
import type { ReactNode } from "react"

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>
        <AuthProvider>
          {children}
          <ScrollToTop />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
