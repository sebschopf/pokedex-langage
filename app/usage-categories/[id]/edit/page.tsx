import { getUsageCategoryById } from "@/lib/server/api/usage-categories"
import { UsageCategoryForm } from "@/components/usage-categories/usage-category-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditUsageCategoryPage({ params }: PageProps) {
  const id = Number.parseInt(params.id, 10)

  if (isNaN(id)) {
    notFound()
  }

  const category = await getUsageCategoryById(id)

  if (!category) {
    notFound()
  }

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
        <h1 className="text-3xl font-bold mb-6">Modifier la catégorie d'usage</h1>
        <UsageCategoryForm category={category} />
      </div>
    </div>
  )
}
