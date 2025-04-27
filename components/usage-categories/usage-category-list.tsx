'use client';

import type { UsageCategory } from '@/types/models/usage-category';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Eye } from 'lucide-react';
// Mettre à jour l'import de formatDate
import { formatDate } from '@/utils';
import { DeleteUsageCategoryButton } from './delete-usage-category-button';

interface UsageCategoryListProps {
  categories: UsageCategory[];
}

export function UsageCategoryList({ categories }: UsageCategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Aucune catégorie d'usage trouvée.</p>
        <Link href="/usage-categories/new">
          <Button>Créer une catégorie</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map(category => (
        <Card key={category.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <CardTitle className="truncate">{category.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {category.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
            )}

            <div className="text-sm text-gray-500 mb-4">
              <p>Créé le: {formatDate(category.createdAt)}</p>
              {category.updatedAt && <p>Mis à jour le: {formatDate(category.updatedAt)}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Link href={`/usage-categories/${category.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>Voir</span>
                </Button>
              </Link>
              <Link href={`/usage-categories/${category.id}/edit`}>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit size={14} />
                  <span>Modifier</span>
                </Button>
              </Link>
              <DeleteUsageCategoryButton id={category.id} size="sm" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
