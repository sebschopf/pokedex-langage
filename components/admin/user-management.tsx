"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import AvatarUpload from "@/components/avatar-upload"
import { UserRoleBadge } from "@/components/user-role-badge"
import type { UserWithDetails } from "@/types/dto/user-management"
import type { UserRoleTypeDB } from "@/lib/client/permissions"
import { toStringId } from "@/utils/conversion"

interface UserManagementProps {
  users: UserWithDetails[]
}

export function UserManagement({ users: initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState<UserWithDetails[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(null)
  const { toast } = useToast()
  const supabase = createBrowserClient()

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.auth.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.profile.fullName && user.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.profile.username && user.profile.username.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Mettre à jour le rôle d'un utilisateur
  const updateUserRole = async (userId: string, newRole: UserRoleTypeDB) => {
    setIsUpdating({ ...isUpdating, [userId]: true })

    try {
      // Utiliser withTokenRefresh pour gérer automatiquement le rafraîchissement du token
      await withTokenRefresh(async () => {
        const { error } = await supabase
          .from("user_roles")
          .update({
            role: newRole,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)

        if (error) throw error

        toast({
          title: "Rôle mis à jour avec succès",
          description: `Le rôle de l'utilisateur a été mis à jour.`,
        })

        // Mettre à jour l'état local - Utilisation de toStringId pour la conversion
        setUsers(
          users.map((user) =>
            toStringId(user.id) === userId
              ? {
                  ...user,
                  role: {
                    ...user.role,
                    role: newRole as UserRoleTypeDB,
                    updatedAt: new Date().toISOString(),
                  },
                }
              : user,
          ),
        )

        // Mettre à jour l'utilisateur sélectionné si nécessaire - Utilisation de toStringId
        if (selectedUser && toStringId(selectedUser.id) === userId) {
          setSelectedUser({
            ...selectedUser,
            role: {
              ...selectedUser.role,
              role: newRole as UserRoleTypeDB,
              updatedAt: new Date().toISOString(),
            },
          })
        }
      })
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du rôle:", error)
      toast({
        title: "Erreur lors de la mise à jour du rôle",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsUpdating({ ...isUpdating, [userId]: false })
    }
  }

  // Formater la date
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "Non disponible"

    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    } catch (error) {
      console.error("Erreur de formatage de date:", error)
      return "Format invalide"
    }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Rechercher des utilisateurs</CardTitle>
              <CardDescription>Recherchez par email, nom ou rôle</CardDescription>
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
                      <th className="text-left py-3 px-4">Utilisateur</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Rôle</th>
                      <th className="text-left py-3 px-4">Date d'inscription</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className={`border-b hover:bg-gray-50 cursor-pointer ${
                            selectedUser?.id === user.id ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setSelectedUser(user)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-3">
                                {/* Utilisation de toStringId pour la conversion */}
                                <AvatarUpload
                                  userId={toStringId(user.id)}
                                  avatarUrl={user.profile.avatarUrl || null}
                                  size="sm"
                                />
                              </div>
                              <div>
                                {(user.profile.fullName || user.profile.username) && (
                                  <p className="font-medium">{user.profile.fullName || user.profile.username}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{user.auth.email}</td>
                          <td className="py-3 px-4">
                            <UserRoleBadge role={user.role.role} />
                          </td>
                          <td className="py-3 px-4">{formatDate(user.auth.createdAt)}</td>
                          <td className="py-3 px-4 text-right">
                            <Select
                              value={user.role.role}
                              onValueChange={(value) => updateUserRole(toStringId(user.id), value as UserRoleTypeDB)}
                              disabled={isUpdating[toStringId(user.id)]}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Changer le rôle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="validator">Validator</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="registered">Registered</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-gray-500">
                          Aucun utilisateur trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedUser ? (
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'utilisateur</CardTitle>
                <CardDescription>Informations et paramètres</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  {/* Utilisation de toStringId pour la conversion */}
                  <AvatarUpload
                    userId={toStringId(selectedUser.id)}
                    avatarUrl={selectedUser.profile.avatarUrl || null}
                    size="lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <p className="font-medium">{selectedUser.auth.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Nom d'utilisateur</h3>
                    <p className="font-medium">{selectedUser.profile.username || "Non défini"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Nom complet</h3>
                    <p className="font-medium">{selectedUser.profile.fullName || "Non défini"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Biographie</h3>
                    {selectedUser.profile.bio ? (
                      <p className="font-medium">{selectedUser.profile.bio}</p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Aucune biographie</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Site web</h3>
                    {selectedUser.profile.website ? (
                      <a
                        href={selectedUser.profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedUser.profile.website}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400 italic">Non défini</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date d'inscription</h3>
                    <p className="font-medium">{formatDate(selectedUser.auth.createdAt)}</p>
                  </div>

                  {selectedUser.auth.lastSignInAt && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Dernière connexion</h3>
                      <p className="font-medium">{formatDate(selectedUser.auth.lastSignInAt)}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Rôle</h3>
                    <Select
                      defaultValue={selectedUser.role.role}
                      onValueChange={(value) => updateUserRole(toStringId(selectedUser.id), value as UserRoleTypeDB)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="validator">Validateur</SelectItem>
                        <SelectItem value="verified">Vérifié</SelectItem>
                        <SelectItem value="registered">Inscrit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <p>Sélectionnez un utilisateur pour voir ses détails</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
