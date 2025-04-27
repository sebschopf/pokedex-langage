'use client';

import type { Language } from '@/types/models/language';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LanguageListProps {
  languages: Language[];
}

export function LanguageList({ languages }: LanguageListProps) {
  if (languages.length === 0) {
    return <p className="text-gray-500">Aucun langage trouvé.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {languages.map(language => (
        <Link key={language.id} href={`/languages/${language.slug}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {language.logoPath ? (
                  <img
                    src={language.logoPath || '/placeholder.svg'}
                    alt={language.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {language.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{language.name}</h3>
                  {language.type && (
                    <Badge variant="outline" className="mt-1">
                      {language.type}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
