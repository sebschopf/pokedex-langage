import { getUsageCategoryById, getLanguagesByUsageCategoryId } from "@/lib/server/api/usage-categories"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/utils/formatting"
import { DeleteUsageCategoryButton } from "@/components/usage-categories/delete-usage-category-button"
import { LanguageList } from "@/components/languages/language-list"

interface PageProps {
  params: {
    id: string
  }
}

export default async function UsageCategoryDetailPage({ params }: PageProps) {
  const id = Number.parseInt(params.id, 10)

  if (isNaN(id)) {
    notFound()
  }

  const category = await getUsageCategoryById(id)

  if (!category) {
    notFound()
  }

  const languages = await getLanguagesByUsageCategoryId(id)

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {category.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{category.description}</p>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Créé le</h3>
                <p className="mt-1">{formatDate(category.createdAt)}</p>
              </div>

              {category.updatedAt && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Dernière mise à jour</h3>
                  <p className="mt-1">{formatDate(category.updatedAt)}</p>
                </div>
              )}

              <div className="flex gap-2 mt-6">
                <Link href={`/usage-categories/${id}/edit`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit size={16} />
                    <span>Modifier</span>
                  </Button>
                </Link>
                <DeleteUsageCategoryButton id={id} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Langages associés</CardTitle>
            </CardHeader>
            <CardContent>
              {languages.length > 0 ? (
                <LanguageList languages={languages} />
              ) : (
                <p className="text-gray-500">Aucun langage associé à cette catégorie.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
