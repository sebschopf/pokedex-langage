import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Providers>
          <div className="container mx-auto px-4 py-8">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
