import { createServerClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { UserRoleBadge } from "@/components/user-role-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { hasRole } from "@/lib/supabase/"
import { UpdateUserRoleForm } from "@/components/admin/update-user-role-form"
import { formatDate } from "@/utils" // Utilisation de votre fonction formatDate existante
import type { UserRoleType } from "@/types/database/user-role" // Importation du type UserRoleType

// Définition des types pour les données Supabase
interface AuthUser {
  email: string
  created_at: string
  last_sign_in_at: string | null
}

interface Profile {
  username: string | null
  avatar_url: string | null
  updated_at: string | null
}

interface UserData {
  id: string
  role: UserRoleType // Changé de string à UserRoleType
  auth_users: AuthUser[]
  profiles: Profile[]
}

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
    .select(`
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
        updated_at
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !data) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    redirect("/admin/users")
  }

  // Conversion du type any vers notre type défini
  // Vérifier que le rôle est valide
  const isValidRole = (role: string): role is UserRoleType => {
    return ["admin", "validator", "verified", "registered", "anonymous"].includes(role)
  }

  // Utiliser un rôle par défaut si le rôle n'est pas valide
  const userRole: UserRoleType = isValidRole(data.role) ? data.role : "registered"

  // Créer l'objet user avec le rôle validé
  const user: UserData = {
    ...(data as any),
    role: userRole,
  }

  // Extraction des données du premier élément des tableaux pour faciliter l'accès
  const authUser = user.auth_users?.[0] || {
    email: "",
    created_at: new Date().toISOString(),
    last_sign_in_at: null,
  }

  const profile = user.profiles?.[0] || {
    username: null,
    avatar_url: null,
    updated_at: null,
  }

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

  const avatarUrl = getAvatarUrl(profile.avatar_url)
  const displayName = profile.username || authUser.email || "Utilisateur"
  const userInitial = (displayName[0] || "U").toUpperCase()

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
                  <AvatarImage src={avatarUrl} alt={displayName} />
                ) : (
                  <AvatarFallback className="text-2xl">{userInitial}</AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{authUser.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Nom d'utilisateur</p>
                <p>{profile.username || "Non défini"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rôle actuel</p>
                <div className="mt-1">
                  <UserRoleBadge role={user.role} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Date d'inscription</p>
                <p>{formatDate(authUser.created_at) || "Non disponible"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Dernière connexion</p>
                <p>{authUser.last_sign_in_at ? formatDate(authUser.last_sign_in_at) : "Jamais"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Dernière mise à jour du profil</p>
                <p>{profile.updated_at ? formatDate(profile.updated_at) : "Jamais"}</p>
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
            <UpdateUserRoleForm userId={user.id} currentRole={user.role} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

