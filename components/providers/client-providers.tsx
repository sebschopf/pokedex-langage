"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers/query-client-wrapper"
import ScrollToTop from "@/components/scroll-to-top"
import type { ReactNode } from "react"

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Providers>
        {children}
        <ScrollToTop />
      </Providers>
    </ThemeProvider>
  )
}
