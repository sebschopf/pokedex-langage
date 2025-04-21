import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminLayout from "@/components/admin/layout" // Import par défaut
import { UserManagement } from "@/components/admin/user-management"
import type { UserWithDetails } from "@/types/dto/user-management"
import type { UserRoleTypeDB } from "@/lib/client/permissions"

export const metadata = {
  title: "Gestion des utilisateurs | POKEDEX_DEV",
  description: "Gérez les utilisateurs et leurs rôles",
}

export default async function AdminUsersPage() {
  const supabase = createServerClient()

  // Vérifier si l'utilisateur est connecté et a le rôle admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/admin/users")
  }

  // Vérifier le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  if (!userRole || userRole.role !== "admin") {
    redirect("/admin/dashboard")
  }

  try {
    // Récupérer les utilisateurs avec leurs rôles
    const { data: userRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("id, role, created_at, updated_at")

    if (rolesError) throw rolesError

    // Récupérer les profils
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username, full_name, bio, website, avatar_url, created_at, updated_at")

    if (profilesError) throw profilesError

    // Récupérer les utilisateurs auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) throw authError

    // Combiner les données
    const usersWithDetails: UserWithDetails[] = userRoles.map((roleData) => {
      const profile = profiles.find((p) => p.id === roleData.id) || {
        id: roleData.id,
        username: null,
        full_name: null,
        bio: null,
        website: null,
        avatar_url: null,
        created_at: null,
        updated_at: null,
      }

      const authUser = authUsers.users.find((au) => au.id === roleData.id)

      return {
        id: roleData.id,
        auth: {
          id: roleData.id,
          email: authUser?.email || "email@inconnu.com",
          // Utiliser une valeur par défaut pour s'assurer que createdAt n'est jamais null
          createdAt: authUser?.created_at || roleData.created_at || new Date().toISOString(),
          lastSignInAt: authUser?.last_sign_in_at || null,
        },
        profile: {
          id: profile.id,
          username: profile.username,
          fullName: profile.full_name,
          bio: profile.bio,
          website: profile.website,
          avatarUrl: profile.avatar_url,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at,
        },
        role: {
          id: roleData.id,
          role: roleData.role as UserRoleTypeDB,
          createdAt: roleData.created_at || new Date().toISOString(), // Valeur par défaut
          updatedAt: roleData.updated_at,
        },
      }
    })

    return (
      <AdminLayout>
        <UserManagement users={usersWithDetails} />
      </AdminLayout>
    )
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
    return (
      <AdminLayout>
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold mb-4">Erreur</h1>
          <p className="text-red-500">
            Une erreur est survenue lors de la récupération des données. Veuillez réessayer ultérieurement.
          </p>
          <Button asChild className="mt-4">
            <a href="/admin/dashboard">Retour au tableau de bord</a>
          </Button>
        </div>
      </AdminLayout>
    )
  }
}
