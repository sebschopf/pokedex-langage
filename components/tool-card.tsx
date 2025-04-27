'use client';

import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/utils/theme/cn';
import { Badge } from '@/components/ui/badge';
import type { Library } from '@/types/models/library';

interface ToolWithLanguages extends Library {
  languages?: Array<{
    id: number;
    name: string;
    slug: string;
    isPrimary: boolean;
    logo_path?: string | null;
  }>;
}

interface ToolCardProps {
  tool: ToolWithLanguages;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Trouver le langage principal s'il existe
  const primaryLanguage = tool.languages?.find(lang => lang.isPrimary);

  return (
    <div
      className={cn(
        'block h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1',
        'dark:bg-[#2a2a20] dark:border-[#3a3a30] dark:shadow-[8px_8px_0px_0px_rgba(58,58,48,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(58,58,48,1)]',
      )}
    >
      <div className="p-4 pb-6 flex flex-col h-full">
        {/* Badges en haut */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-600 text-white font-bold px-2 py-1">
            {tool.technologyType || "Outil d'analyse"}
          </div>

          {tool.isOpenSource !== undefined && (
            <div
              className={`${
                tool.isOpenSource ? 'bg-green-500 text-white' : 'bg-red-600 text-white'
              } font-bold px-2 py-1`}
            >
              {tool.isOpenSource ? 'Open Source' : 'Propriétaire'}
            </div>
          )}
        </div>

        {/* Nom de l'outil */}
        <Link href={`/tools/${tool.slug}`}>
          <h2 className="text-2xl font-bold mb-4 hover:underline">{tool.name}</h2>
        </Link>

        {/* Description */}
        <p className="text-center mb-4 line-clamp-3">
          {tool.description || 'Aucune description disponible'}
        </p>

        {/* Langages associés */}
        {tool.languages && tool.languages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Langages:</h3>
            <div className="flex flex-wrap gap-1">
              {primaryLanguage && (
                <Link href={`/languages/${primaryLanguage.slug}`}>
                  <Badge variant="success" className="text-xs">
                    {primaryLanguage.name}
                  </Badge>
                </Link>
              )}

              {tool.languages
                .filter(lang => !lang.isPrimary)
                .slice(0, 2) // Limiter à 2 langages secondaires pour éviter de surcharger la carte
                .map(lang => (
                  <Link key={lang.id} href={`/languages/${lang.slug}`}>
                    <Badge variant="outline" className="text-xs">
                      {lang.name}
                    </Badge>
                  </Link>
                ))}

              {/* Afficher un badge +X si plus de 2 langages secondaires */}
              {tool.languages.filter(lang => !lang.isPrimary).length > 2 && (
                <Link href={`/tools/${tool.slug}`}>
                  <Badge variant="secondary" className="text-xs">
                    +{tool.languages.filter(lang => !lang.isPrimary).length - 2}
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Liens */}
        <div className="mt-auto flex gap-2">
          {tool.officialWebsite && (
            <a
              href={tool.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <ExternalLink size={16} />
              Site officiel
            </a>
          )}

          {tool.githubUrl && (
            <a
              href={tool.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:underline"
            >
              <Github size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
