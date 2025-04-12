"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, CheckCircle, Circle, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Todo, TodoCategory, TodoStatus } from "@/types/models"

interface TodoItemProps {
  todo: Todo
  categories: TodoCategory[]
  statuses: TodoStatus[]
  onDelete: (id: number) => void
  onUpdate: (todo: Todo) => void
}

export function TodoItem({ todo, categories, statuses, onDelete, onUpdate }: TodoItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  // Trouver la catégorie et le statut correspondants
  const category = categories.find((c) => c.id === todo.categoryId)
  const status = statuses.find((s) => s.id === todo.statusId)

  // Formater la date d'échéance
  const formattedDueDate = todo.dueDate ? format(new Date(todo.dueDate), "d MMMM yyyy", { locale: fr }) : null

  // Gérer le changement de statut de complétion
  const handleToggleCompletion = async () => {
    try {
      setIsLoading(true)
      // Créer une copie mise à jour de la tâche
      const updatedTodo = {
        ...todo,
        isCompleted: !todo.isCompleted,
      }

      // Appeler la fonction de mise à jour fournie par le parent
      onUpdate(updatedTodo)
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Gérer la suppression
  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        setIsLoading(true)
        onDelete(todo.id)
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className={cn("transition-all", todo.isCompleted && "opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={handleToggleCompletion}
              disabled={isLoading}
              className="mt-1 text-gray-500 hover:text-green-500 transition-colors"
              aria-label={todo.isCompleted ? "Marquer comme non terminée" : "Marquer comme terminée"}
            >
              {todo.isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5" />}
            </button>
            <div>
              <h3 className={cn("font-medium text-lg", todo.isCompleted && "line-through")}>{todo.title}</h3>
              {todo.description && <p className="text-gray-600 mt-1">{todo.description}</p>}
              <div className="flex flex-wrap gap-2 mt-2">
                {category && (
                  <Badge style={{ backgroundColor: category.color }} className="text-white">
                    {category.name}
                  </Badge>
                )}
                {status && <Badge variant="outline">{status.name}</Badge>}
                {formattedDueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formattedDueDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-2 pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (window.location.href = `/todos/edit/${todo.id}`)}
          disabled={isLoading}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Modifier
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isLoading} className="text-red-500">
          <Trash2 className="h-4 w-4 mr-1" />
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  )
}
