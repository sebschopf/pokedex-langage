import { getAllUsageCategories } from '@/lib/server/api/usage-categories';
import { UsageCategoryList } from '@/components/usage-categories/usage-category-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function UsageCategoriesPage() {
  const categories = await getAllUsageCategories();

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Catégories d'usage</h1>
        <Link href="/usage-categories/new">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Nouvelle catégorie</span>
          </Button>
        </Link>
      </div>

      <UsageCategoryList categories={categories} />
    </div>
  );
}
