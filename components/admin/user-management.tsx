"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"
import { createSupabaseClient } from "@/lib/supabase"

interface User {
  id: string
  role: string
  created_at: string
  auth_users: {
    email: string
    created_at: string
  }
}

interface UserManagementProps {
  users: User[]
}

export function UserManagement({ users: initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})
  const { toast } = useToast()
  const { update } = useSupabaseMutation()
  const supabase = createSupabaseClient()

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.auth_users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Mettre à jour le rôle d'un utilisateur
  const updateUserRole = async (userId: string, newRole: string) => {
    setIsUpdating({ ...isUpdating, [userId]: true })

    try {
      await update({
        table: "user_roles",
        data: { role: newRole },
        match: { id: userId },
        successMessage: "Rôle mis à jour avec succès",
        errorMessage: "Erreur lors de la mise à jour du rôle",
        onSuccess: () => {
          // Mettre à jour l'état local
          setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
        },
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error)
    } finally {
      setIsUpdating({ ...isUpdating, [userId]: false })
    }
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-gray-500 mt-2">Gérez les rôles et les permissions des utilisateurs</p>
        </div>
        <Button asChild variant="outline">
          <a href="/admin/dashboard">Retour au tableau de bord</a>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Rechercher des utilisateurs</CardTitle>
          <CardDescription>Recherchez par email ou par rôle</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>{users.length} utilisateurs enregistrés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Rôle</th>
                  <th className="text-left py-3 px-4">Date d'inscription</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">{user.auth_users.email}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            user.role === "admin"
                              ? "bg-red-500"
                              : user.role === "validator"
                                ? "bg-blue-500"
                                : user.role === "verified"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                          }
                        >
                          {user.role === "admin"
                            ? "Administrateur"
                            : user.role === "validator"
                              ? "Validateur"
                              : user.role === "verified"
                                ? "Vérifié"
                                : "Enregistré"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{formatDate(user.created_at)}</td>
                      <td className="py-3 px-4">
                        <Select
                          defaultValue={user.role}
                          onValueChange={(value) => updateUserRole(user.id, value)}
                          disabled={isUpdating[user.id]}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Changer le rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrateur</SelectItem>
                            <SelectItem value="validator">Validateur</SelectItem>
                            <SelectItem value="verified">Vérifié</SelectItem>
                            <SelectItem value="registered">Enregistré</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

