"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { createUsageCategory, updateUsageCategory } from "@/app/actions/usage-category-actions"
import type { UsageCategory } from "@/types/models/usage-category"
import { toast } from "@/components/ui/use-toast"

interface UsageCategoryFormProps {
  category?: UsageCategory
}

export function UsageCategoryForm({ category }: UsageCategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<UsageCategory>>({
    name: category?.name || "",
    description: category?.description || "",
  })

  const isEditing = !!category

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()

      if (isEditing && category) {
        formDataObj.append("id", String(category.id))
      }

      formDataObj.append("name", formData.name || "")

      if (formData.description) {
        formDataObj.append("description", formData.description)
      }

      const result = isEditing ? await updateUsageCategory(formDataObj) : await createUsageCategory(formDataObj)

      if (result.success) {
        toast({
          title: isEditing ? "Catégorie mise à jour" : "Catégorie créée",
          description: result.message,
        })
        router.push("/usage-categories")
        router.refresh()
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission du formulaire",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
              placeholder="Nom de la catégorie"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description de la catégorie"
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push("/usage-categories")}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : isEditing ? "Mettre à jour" : "Créer"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
