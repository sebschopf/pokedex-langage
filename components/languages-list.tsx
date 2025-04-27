'use client';

import Link from 'next/link';
import type { Language } from '@/types/models/language';

interface LanguageListProps {
  languages: Language[];
  title?: string;
  emptyMessage?: string;
}

export default function LanguageList({
  languages,
  title = 'Langages',
  emptyMessage = 'Aucun langage trouvé',
}: LanguageListProps) {
  if (!languages || languages.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {languages.map(language => (
          <Link
            key={language.id}
            href={`/languages/${language.slug || language.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-lg">{language.name}</h3>
            {language.description && (
              <p className="text-gray-600 mt-2 text-sm">
                {language.description.length > 100
                  ? `${language.description.substring(0, 100)}...`
                  : language.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
