"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import type { TodoCategory, TodoStatus } from "@/types/models"

interface TodoFiltersProps {
  categories: TodoCategory[]
  statuses: TodoStatus[]
  onFilterChange: (filters: {
    search: string
    categoryId: number | null
    statusId: number | null
    showCompleted: boolean
  }) => void
}

export function TodoFilters({ categories, statuses, onFilterChange }: TodoFiltersProps) {
  const [search, setSearch] = useState("")
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [statusId, setStatusId] = useState<number | null>(null)
  const [showCompleted, setShowCompleted] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  // Appliquer les filtres
  const applyFilters = () => {
    onFilterChange({
      search,
      categoryId,
      statusId,
      showCompleted,
    })
    setIsOpen(false)
  }

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearch("")
    setCategoryId(null)
    setStatusId(null)
    setShowCompleted(true)
    onFilterChange({
      search: "",
      categoryId: null,
      statusId: null,
      showCompleted: true,
    })
    setIsOpen(false)
  }

  // Gérer la recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({
      search: e.target.value,
      categoryId,
      statusId,
      showCompleted,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Rechercher une tâche..." value={search} onChange={handleSearchChange} className="pl-10" />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtres
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtrer les tâches</SheetTitle>
            <SheetDescription>Utilisez les options ci-dessous pour filtrer vos tâches.</SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Catégorie</label>
              <Select
                value={categoryId?.toString() || ""}
                onValueChange={(value) => setCategoryId(value ? Number.parseInt(value) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select
                value={statusId?.toString() || ""}
                onValueChange={(value) => setStatusId(value ? Number.parseInt(value) : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-completed"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="show-completed" className="text-sm font-medium">
                Afficher les tâches terminées
              </label>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={resetFilters}>
              Réinitialiser
            </Button>
            <Button onClick={applyFilters}>Appliquer</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
