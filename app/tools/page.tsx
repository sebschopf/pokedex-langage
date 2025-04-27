import { createServerClient } from '@/lib/supabase/server';
import { ToolGrid } from '@/components/tool-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { dbToLibrary } from '@/lib/server/mapping/library-mapping/db-to-library';
import type { DbLibrary } from '@/types/database/library';
import type { Library } from '@/types/models/library';
import { getLanguagesForLibrary } from '@/lib/server/api/library-languages';

export const metadata = {
  title: "Outils d'analyse web | POKEDEX_DEV",
  description: "Découvrez les meilleurs outils d'analyse web pour améliorer vos applications",
};

export default async function ToolsPage() {
  const supabase = createServerClient();

  // Récupérer les outils d'analyse web avec le bon type
  const { data: toolsData, error } = await supabase
    .from('libraries')
    .select(`*`)
    .eq('technology_type', 'testing-tool')
    .order('name');

  if (error) {
    console.error('Erreur lors de la récupération des outils:', error);
  }

  // Convertir les données de la base de données en modèle d'application
  const tools: Library[] = toolsData ? toolsData.map(tool => dbToLibrary(tool as DbLibrary)) : [];

  // Récupérer les langages associés pour chaque outil
  const toolsWithLanguages = await Promise.all(
    tools.map(async tool => {
      const languages = await getLanguagesForLibrary(tool.id);
      // Transformer les langages pour garantir que isPrimary est toujours un booléen
      const transformedLanguages = languages.map(lang => ({
        ...lang,
        isPrimary: !!lang.isPrimary, // Convertit boolean | null en boolean
      }));
      return {
        ...tool,
        languages: transformedLanguages,
      };
    }),
  );

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Outils d'analyse web</h1>
          <p className="text-lg text-gray-600">
            Découvrez les meilleurs outils pour analyser et améliorer les performances de vos
            applications web
          </p>
        </div>
        <Link href="/tools/add">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            Ajouter un outil
          </Button>
        </Link>
      </div>

      {toolsWithLanguages && toolsWithLanguages.length > 0 ? (
        <ToolGrid tools={toolsWithLanguages} />
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Aucun outil d'analyse trouvé</p>
        </div>
      )}
    </div>
  );
}
