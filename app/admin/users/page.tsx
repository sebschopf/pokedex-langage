import { Button } from "@/components/ui/button"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/layout"
import { UserManagement } from "@/components/admin/user-management"
import type { UserWithDetails } from "@/types/dto/user-management"
import type { UserRoleType } from "@/types/database/user-role"

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
          email: authUser?.email || "email@inconnu.com", // Valeur par défaut si undefined
          created_at: authUser?.created_at || roleData.created_at, // Utiliser la date de création du rôle si celle de l'auth est manquante
          last_sign_in_at: authUser?.last_sign_in_at || null,
        },
        profile: {
          id: profile.id,
          username: profile.username,
          full_name: profile.full_name,
          bio: profile.bio,
          website: profile.website,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        },
        role: {
          id: roleData.id,
          role: roleData.role as UserRoleType,
          created_at: roleData.created_at,
          updated_at: roleData.updated_at,
        },
      }
    })

    return (
      <AdminLayout userRole="admin">
        <UserManagement users={usersWithDetails} />
      </AdminLayout>
    )
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error)
    return (
      <AdminLayout userRole="admin">
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
