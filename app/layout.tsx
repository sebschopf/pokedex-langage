import { inter } from "./fonts"
import AppProviders from "./providers"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <AppProviders>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  )
}