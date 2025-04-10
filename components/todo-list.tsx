"use client"

import { useState } from "react"
import { TodoItem } from "@/components/todo-item"
import { TodoFilters } from "@/components/todo-filters"
import type { Todo, TodoCategory, TodoStatus } from "@/types"

interface TodoListProps {
  initialTodos: Todo[]
  categories: TodoCategory[]
  statuses: TodoStatus[]
}

export function TodoList({ initialTodos, categories, statuses }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(initialTodos)

  // Gérer la suppression d'une tâche
  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    applyFilters(updatedTodos)
  }

  // Gérer la mise à jour d'une tâche
  const handleUpdate = (updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    setTodos(updatedTodos)
    applyFilters(updatedTodos)
  }

  // Appliquer les filtres
  const applyFilters = (
    todosToFilter: Todo[],
    filters = {
      search: "",
      categoryId: null as number | null,
      statusId: null as number | null,
      showCompleted: true,
    },
  ) => {
    let filtered = [...todosToFilter]

    // Filtrer par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description && todo.description.toLowerCase().includes(searchLower)),
      )
    }

    // Filtrer par catégorie
    if (filters.categoryId) {
      filtered = filtered.filter((todo) => todo.category_id === filters.categoryId)
    }

    // Filtrer par statut
    if (filters.statusId) {
      filtered = filtered.filter((todo) => todo.status_id === filters.statusId)
    }

    // Filtrer les tâches terminées
    if (!filters.showCompleted) {
      filtered = filtered.filter((todo) => !todo.is_completed)
    }

    setFilteredTodos(filtered)
  }

  // Gérer le changement de filtres
  const handleFilterChange = (filters: {
    search: string
    categoryId: number | null
    statusId: number | null
    showCompleted: boolean
  }) => {
    applyFilters(todos, filters)
  }

  return (
    <div>
      <TodoFilters categories={categories} statuses={statuses} onFilterChange={handleFilterChange} />

      {filteredTodos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-600">Aucune tâche trouvée</h3>
          <p className="text-gray-500 mt-2">Créez une nouvelle tâche ou modifiez vos filtres.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              categories={categories}
              statuses={statuses}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
