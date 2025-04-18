"use client"

import type React from "react"
import type { DbLanguage } from "@/types/database/language"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"
import { toNumberOrNull, isValidId } from "@/utils/conversion/type-conversion"

// Types pour le formulaire
export interface LanguageFormProps {
  id?: string | number | null // Accepte à la fois string et number
  initialData?: LanguageFormData
  language?: DbLanguage // Utiliser DbLanguage au lieu de Language
  onSuccess?: () => void
  mode?: "direct" | "suggestion" // Prop pour le mode
}

interface LanguageFormData {
  name: string
  slug: string
  short_description?: string | null
  description?: string | null
  type?: string | null
  used_for?: string | null
  year_created?: number | null
  usage_rate?: number | null
  is_open_source?: boolean | null
  // Ajoutez d'autres champs selon vos besoins
}

export function LanguageForm({ id, initialData, language, onSuccess, mode = "direct" }: LanguageFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<LanguageFormData>(
    initialData ||
      language || {
        name: "",
        slug: "",
        short_description: null,
        description: null,
        type: null,
        used_for: null,
        year_created: null,
        usage_rate: null,
        is_open_source: null,
      },
  )

  // Utiliser language pour initialiser formData si fourni
  useEffect(() => {
    if (language) {
      setFormData({
        name: language.name,
        slug: language.slug,
        short_description: language.short_description,
        description: language.description,
        type: language.type,
        used_for: language.used_for,
        year_created: language.year_created,
        usage_rate: language.usage_rate,
        is_open_source: language.is_open_source,
      })
    }
  }, [language])

  // Convertir l'ID en nombre pour la base de données
  const numericId = toNumberOrNull(id || (language?.id ?? null))
  const isEditing = isValidId(numericId)

  // Utiliser useSupabaseMutation pour les opérations de base de données
  const { mutate: createLanguage, isLoading: isCreating } = useSupabaseMutation({
    table: mode === "direct" ? "languages" : "language_proposals",
    operation: "insert",
    onSuccess: () => {
      router.refresh()
      if (onSuccess) onSuccess()
    },
  })

  const { mutate: updateLanguage, isLoading: isUpdating } = useSupabaseMutation({
    table: mode === "direct" ? "languages" : "language_proposals",
    operation: "update",
    onSuccess: () => {
      router.refresh()
      if (onSuccess) onSuccess()
    },
  })

  const isLoading = isCreating || isUpdating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Préparer les données en fonction du mode
      const dataToSubmit = { ...formData } as any

      // Si c'est une suggestion, ajouter le statut
      if (mode === "suggestion") {
        dataToSubmit["status"] = "pending"
      }

      if (isEditing && numericId) {
        // Mise à jour d'un langage existant
        await updateLanguage({
          data: dataToSubmit,
          filters: { id: numericId },
        })
      } else {
        // Création d'un nouveau langage
        await createLanguage({
          data: dataToSubmit,
        })
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // Gérer les différents types de champs
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: value ? Number(value) : null }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value || null }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="short_description" className="block text-sm font-medium">
          Description courte
        </label>
        <textarea
          id="short_description"
          name="short_description"
          value={formData.short_description || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="year_created" className="block text-sm font-medium">
          Année de création
        </label>
        <input
          type="number"
          id="year_created"
          name="year_created"
          value={formData.year_created || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="is_open_source" className="flex items-center">
          <input
            type="checkbox"
            id="is_open_source"
            name="is_open_source"
            checked={formData.is_open_source || false}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm">Open Source</span>
        </label>
      </div>

      {/* Ajoutez d'autres champs selon vos besoins */}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Chargement..."
            : mode === "direct"
              ? isEditing
                ? "Mettre à jour"
                : "Créer"
              : isEditing
                ? "Mettre à jour la suggestion"
                : "Soumettre la suggestion"}
        </Button>
      </div>
    </form>
  )
}
