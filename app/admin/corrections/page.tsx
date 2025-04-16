import { getCorrections, updateCorrection } from "@/lib/server/api/corrections"
import { RoleProtected } from "@/components/auth/role-protected"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/date"
import type { Correction } from "@/types/models/correction"
import { revalidatePath } from "next/cache"

export default async function AdminCorrectionsPage() {
  // Récupérer toutes les corrections avec les options de pagination
  const { data: corrections } = await getCorrections({
    page: 1,
    pageSize: 100,
  })

  // Trier les corrections par date de création (plus récentes d'abord)
  const sortedCorrections = [...corrections].sort((a: Correction, b: Correction) => {
    return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
  })

  // Fonction pour mettre à jour le statut d'une correction
  async function handleStatusUpdate(id: number, newStatus: string) {
    "use server"

    try {
      await updateCorrection(id, { status: newStatus })
      // Revalider le chemin pour rafraîchir les données
      revalidatePath("/admin/corrections")
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
    }
  }

  return (
    <RoleProtected userRole={["admin", "validator"]}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Gestion des Corrections</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Langage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCorrections.map((correction) => (
                <tr key={correction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {/* Utiliser languageId puisque languageName n'est pas disponible */}
                      Langage ID: {correction.languageId}
                    </div>
                    {correction.field && <div className="text-sm text-gray-500">Champ: {correction.field}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{correction.correctionText}</div>
                    {correction.suggestion && (
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="font-semibold">Suggestion:</span> {correction.suggestion}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        correction.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : correction.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {correction.status === "approved"
                        ? "Approuvée"
                        : correction.status === "rejected"
                          ? "Rejetée"
                          : "En attente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {correction.createdAt ? formatDate(new Date(correction.createdAt)) : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {correction.status === "pending" && (
                        <>
                          <form
                            action={async () => {
                              await handleStatusUpdate(correction.id, "approved")
                            }}
                          >
                            <Button variant="outline" size="sm" className="text-green-600 hover:text-green-800">
                              Approuver
                            </Button>
                          </form>
                          <form
                            action={async () => {
                              await handleStatusUpdate(correction.id, "rejected")
                            }}
                          >
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                              Rejeter
                            </Button>
                          </form>
                        </>
                      )}
                      {correction.status !== "pending" && (
                        <form
                          action={async () => {
                            await handleStatusUpdate(correction.id, "pending")
                          }}
                        >
                          <Button variant="outline" size="sm">
                            Remettre en attente
                          </Button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {sortedCorrections.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucune correction trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </RoleProtected>
  )
}
