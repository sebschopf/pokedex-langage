import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { RootProvider } from "@/components/providers/root-provider"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <RootProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </RootProvider>
      </body>
    </html>
  )
}
