import { UsageCategoryForm } from '@/components/usage-categories/usage-category-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewUsageCategoryPage() {
  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/usage-categories">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            <span>Retour</span>
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nouvelle catégorie d'usage</h1>
        <UsageCategoryForm />
      </div>
    </div>
  );
}
