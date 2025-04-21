"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"

// Types pour les catégories et statuts
interface TodoCategory {
  id: number
  name: string
  // Autres propriétés si nécessaire
}

interface TodoStatus {
  id: number
  name: string
  // Autres propriétés si nécessaire
}

// Types pour le formulaire
interface TodoFormProps {
  todo?: Todo
  categories?: TodoCategory[]
  statuses?: TodoStatus[] 
  onSubmit?: (data: Todo) => void
}

interface Todo {
  id?: number
  title: string
  description?: string | null
  status_id?: number | null
  category_id?: number | null
  user_id?: string | null
  due_date?: string | null
}

export default function TodoForm({ todo, categories = [], statuses = [], onSubmit }: TodoFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Todo>(
    todo || {
      title: "",
      description: "",
      status_id: statuses.length > 0 ? statuses[0].id : null,
      category_id: null,
      due_date: null,
    },
  )

  const isEditing = !!todo?.id

  // Utiliser useSupabaseMutation pour les opérations de base de données
  const { mutate: createTodo, isLoading: isCreating } = useSupabaseMutation({
    table: "todos",
    operation: "insert",
    onSuccess: (data) => {
      router.refresh()
      if (onSubmit) onSubmit(data[0] as Todo)
    },
  })

  const { mutate: updateTodo, isLoading: isUpdating } = useSupabaseMutation({
    table: "todos",
    operation: "update",
    onSuccess: (data) => {
      router.refresh()
      if (onSubmit) onSubmit(data[0] as Todo)
    },
  })

  const isLoading = isCreating || isUpdating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isEditing && todo?.id) {
        // Mise à jour d'une tâche existante
        await updateTodo({
          data: formData,
          filters: { id: todo.id },
        })
      } else {
        // Création d'une nouvelle tâche
        await createTodo({
          data: formData,
        })
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    // Gérer les différents types de champs
    if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: value ? Number(value) : null }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Titre
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Ajout du champ de sélection pour la catégorie */}
      {categories.length > 0 && (
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium">
            Catégorie
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Ajout du champ de sélection pour le statut */}
      {statuses.length > 0 && (
        <div>
          <label htmlFor="status_id" className="block text-sm font-medium">
            Statut
          </label>
          <select
            id="status_id"
            name="status_id"
            value={formData.status_id || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Sélectionner un statut</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="due_date" className="block text-sm font-medium">
          Date d'échéance
        </label>
        <input
          type="date"
          id="due_date"
          name="due_date"
          value={formData.due_date || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : isEditing ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  )
}
