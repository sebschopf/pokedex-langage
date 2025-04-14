'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { Providers as QueryProviders } from "@/components/providers/query-client-wrapper"
import { AuthProvider } from "@/components/providers/auth-provider"
import ScrollToTop from "@/components/scroll-to-top"

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProviders>
        <AuthProvider>
          {children}
          <ScrollToTop />
        </AuthProvider>
      </QueryProviders>
    </ThemeProvider>
  )
}