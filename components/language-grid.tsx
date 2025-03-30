"use client"

import type { Language } from "@/types/language"
import { LanguageCard } from "@/components/language-card"

interface LanguageGridProps {
  languages: Language[]
}

export function LanguageGrid({ languages }: LanguageGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {languages.map((language) => (
        <LanguageCard key={language.id} language={language} />
      ))}

      {languages.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No languages found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

