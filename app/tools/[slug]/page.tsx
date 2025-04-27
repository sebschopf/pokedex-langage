import { createServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library';
import { LanguageAssociationManager } from '@/components/language-association-manager';
import { getLanguagesForLibrary } from '@/lib/server/api/library-languages';
import type { DbLibrary } from '@/types/database/library';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = params;
  const supabase = createServerClient();

  // Récupérer les détails de l'outil
  const { data: toolData, error } = await supabase
    .from('libraries')
    .select(`*`)
    .eq('slug', slug)
    .single();

  if (error || !toolData) {
    notFound();
  }

  // Convertir en modèle d'application
  const tool = dbToLibrary(toolData as DbLibrary);

  // Récupérer les langages associés à cet outil
  const associatedLanguagesRaw = await getLanguagesForLibrary(tool.id);

  // Transformer les langages pour garantir que isPrimary est toujours un booléen
  const associatedLanguages = associatedLanguagesRaw.map(lang => ({
    ...lang,
    isPrimary: !!lang.isPrimary, // Convertit boolean | null en boolean
  }));

  // Séparer les langages principaux et secondaires
  const primaryLanguage = associatedLanguages.find(lang => lang.isPrimary);
  const secondaryLanguages = associatedLanguages.filter(lang => !lang.isPrimary);

  return (
    <div className="container py-8">
      <Link href="/tools">
        <Button variant="outline" className="mb-6 flex items-center gap-2">
          <ArrowLeft size={16} />
          Retour aux outils
        </Button>
      </Link>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">{tool.name}</h1>

          {tool.isOpenSource !== undefined && (
            <Badge variant={tool.isOpenSource ? 'success' : 'destructive'}>
              {tool.isOpenSource ? 'Open Source' : 'Propriétaire'}
            </Badge>
          )}
        </div>

        {tool.description && <p className="text-lg mb-8">{tool.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Liens */}
          <div className="border-4 border-black p-4 bg-blue-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Liens</h2>
            <div className="space-y-3">
              {tool.officialWebsite && (
                <a
                  href={tool.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <ExternalLink size={18} />
                  Site officiel
                </a>
              )}

              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:underline"
                >
                  <Github size={18} />
                  Dépôt GitHub
                </a>
              )}
            </div>
          </div>

          {/* Langages associés */}
          <div className="border-4 border-black p-4 bg-yellow-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">
              Langages associés
            </h2>

            {associatedLanguages.length > 0 ? (
              <div className="space-y-4">
                {primaryLanguage && (
                  <div>
                    <h3 className="font-bold mb-2">Langage principal:</h3>
                    <Link href={`/languages/${primaryLanguage.slug}`}>
                      <Badge
                        variant="success"
                        className="text-base py-1 px-3 border-2 border-black hover:bg-green-600 font-bold"
                      >
                        {primaryLanguage.name}
                      </Badge>
                    </Link>
                  </div>
                )}

                {secondaryLanguages.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2">Langages secondaires:</h3>
                    <div className="flex flex-wrap gap-2">
                      {secondaryLanguages.map(language => (
                        <Link key={language.id} href={`/languages/${language.slug}`}>
                          <Badge
                            variant="outline"
                            className="text-base py-1 px-3 border-2 border-black hover:bg-gray-100"
                          >
                            {language.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Aucun langage associé</p>
            )}
          </div>
        </div>

        {/* Section de gestion des associations (pour les administrateurs) */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <LanguageAssociationManager
            toolId={tool.id}
            toolSlug={tool.slug}
            initialAssociations={associatedLanguages}
          />
        </div>
      </div>
    </div>
  );
}
