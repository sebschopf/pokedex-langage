import { requireAdminSC } from "@/lib/server/auth/authorize"
import { getUserWithDetails, getAllUsersWithDetails } from "@/lib/server/api/users"
import { getSession } from "@/lib/server/auth/session"

export default async function AdminDashboardPage() {
  // Vérifier que l'utilisateur est administrateur
  await requireAdminSC()

  // Récupérer la session de l'utilisateur
  const session = await getSession()
  const userId = session?.user.id

  // Récupérer les détails de l'utilisateur connecté
  const userDetails = userId ? await getUserWithDetails(userId) : null

  // Récupérer tous les utilisateurs pour l'administration
  const allUsers = await getAllUsersWithDetails()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord d'administration</h1>

      {userDetails && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Bienvenue, {userDetails.profile?.fullName || userDetails.profile?.username || "Administrateur"}
          </h2>
          <p>Rôle: {userDetails.role}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
          <p className="text-3xl font-bold">{allUsers.length}</p>
          <a href="/admin/users" className="text-blue-600 hover:underline block mt-4">
            Gérer les utilisateurs →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Langages</h2>
          <p className="text-3xl font-bold">-</p>
          <a href="/admin/languages" className="text-blue-600 hover:underline block mt-4">
            Gérer les langages →
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Corrections</h2>
          <p className="text-3xl font-bold">-</p>
          <a href="/admin/corrections" className="text-blue-600 hover:underline block mt-4">
            Gérer les corrections →
          </a>
        </div>
      </div>
    </div>
  )
}
