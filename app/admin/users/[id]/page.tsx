import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserRoleBadge } from "@/components/user-role-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { hasRole } from "@/lib/server/auth"
import { UpdateUserRoleForm } from "@/components/admin/update-user-role-form"
import { formatDate } from "@/utils/date"
import { isValidDbRole, dbRoleToAppRole } from "@/utils/security"
import type { UserRoleType, UserRoleTypeDB } from "@/lib/client/permissions"
import { dbUserWithProfileToUserWithProfile } from "@/lib/server/mapping/profile-mapping"
import type { UserWithProfile } from "@/types/models/profile"

export const metadata = {
  title: "Modifier un utilisateur | POKEDEX_DEV",
  description: "Modifier les informations et le rôle d'un utilisateur",
}

export default async function EditUserPage({ params }: { params: { id: string } }) {
  // Vérifier si l'utilisateur est admin
  const isAdmin = await hasRole("admin")

  if (!isAdmin) {
    redirect("/")
  }

  const supabase = createServerClient()

  // Récupérer l'utilisateur avec son rôle et son profil
  const { data, error } = await supabase
    .from("user_roles")
    .select(
      `
      id,
      role,
      auth_users:id (
        email,
        created_at,
        last_sign_in_at
      ),
      profiles (
        username,
        avatar_url,
        updated_at,
        full_name,
        bio,
        website
      )
    `,
    )
    .eq("id", params.id)
    .single()

  if (error || !data) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    redirect("/admin/users")
  }

  // Utiliser la fonction importée pour valider le rôle
  const userRole: UserRoleTypeDB = isValidDbRole(data.role) ? data.role : "registered"

  // Vérifier si auth_users et profiles sont des tableaux
  const authUsers = Array.isArray(data.auth_users) ? data.auth_users : []
  const profiles = Array.isArray(data.profiles) ? data.profiles : []

  // Utiliser la fonction de mapping existante pour convertir les données
  const userData = {
    id: data.id,
    email: authUsers[0]?.email || null,
    created_at: authUsers[0]?.created_at || null,
    updated_at: null,
    profile: profiles[0] || undefined,
    role: userRole,
  }

  // Convertir en modèle d'application
  const user: UserWithProfile = dbUserWithProfileToUserWithProfile(userData)

  // Fonction pour obtenir l'URL de l'avatar
  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) return null
    try {
      return supabase.storage.from("avatars").getPublicUrl(avatarPath).data.publicUrl
    } catch (e) {
      console.error("Erreur lors de la récupération de l'URL de l'avatar:", e)
      return null
    }
  }

  const avatarUrl = user.profile?.avatarUrl ? getAvatarUrl(user.profile.avatarUrl) : null
  const displayName = user.profile?.username || user.email || "Utilisateur"
  const userInitial = (displayName[0] || "U").toUpperCase()

  // Utiliser la fonction dbRoleToAppRole pour convertir le rôle
  const appRole: UserRoleType = dbRoleToAppRole(userRole)

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Modifier un utilisateur</h1>
        <Button asChild>
          <a href="/admin/users">Retour à la liste</a>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations utilisateur</CardTitle>
            <CardDescription>Détails du compte utilisateur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={displayName} />
                ) : (
                  <AvatarFallback className="text-2xl">{userInitial}</AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{user.email || "Non disponible"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Nom d'utilisateur</p>
                <p>{user.profile?.username || "Non défini"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rôle actuel</p>
                <div className="mt-1">
                  <UserRoleBadge role={appRole} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Date d'inscription</p>
                <p>{user.createdAt ? formatDate(user.createdAt) : "Non disponible"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Dernière mise à jour du profil</p>
                <p>{user.profile?.updatedAt ? formatDate(user.profile.updatedAt) : "Jamais"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modifier le rôle</CardTitle>
            <CardDescription>Attribuer un nouveau rôle à l'utilisateur</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateUserRoleForm userId={user.id} currentRole={userRole} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
