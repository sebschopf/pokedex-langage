import {
  getUsageCategoryById,
  getLanguagesByUsageCategoryId,
} from '@/lib/server/api/usage-categories';
import { notFound } from 'next/navigation';
// Correction de l'importation : utiliser une importation par défaut au lieu d'une importation nommée
import LanguageList from '@/components/languages-list';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface UsageCategoryPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: UsageCategoryPageProps): Promise<Metadata> {
  const id = Number.parseInt(params.id);
  const category = await getUsageCategoryById(id);

  if (!category) {
    return {
      title: 'Catégorie non trouvée',
    };
  }

  return {
    title: `${category.name} - Catégorie d'usage`,
    description: category.description || `Langages de programmation utilisés pour ${category.name}`,
  };
}

export default async function UsageCategoryPage({ params }: UsageCategoryPageProps) {
  const id = Number.parseInt(params.id);
  const category = await getUsageCategoryById(id);

  if (!category) {
    notFound();
  }

  const languages = await getLanguagesByUsageCategoryId(id);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      {category.description && <p className="text-gray-600 mb-6">{category.description}</p>}

      <h2 className="text-2xl font-semibold mb-4">Langages dans cette catégorie</h2>
      <LanguageList
        languages={languages}
        emptyMessage="Aucun langage n'est associé à cette catégorie"
      />
    </div>
  );
}
