import { getAllCorrections } from "@/lib/data"
import { updateCorrectionStatus } from "@/app/actions/correction-actions"
import Link from "next/link"

export default async function AdminCorrectionsPage() {
  const corrections = await getAllCorrections()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Administration des corrections</h1>
        <Link href="/admin" className="px-4 py-2 bg-black text-white font-bold hover:bg-gray-800">
          Retour
        </Link>
      </div>

      <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold mb-4">Corrections en attente</h2>

        {corrections.length === 0 ? (
          <p>Aucune correction en attente.</p>
        ) : (
          <div className="space-y-4">
            {corrections.map((correction) => (
              <div key={correction.id} className="p-4 border-2 border-gray-200">
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    {correction.languageName} {correction.framework && `(${correction.framework})`}
                  </h3>
                  <span
                    className={`px-2 py-1 text-sm ${
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
                </div>
                <p className="my-2">{correction.correctionText}</p>
                <div className="flex gap-2 mt-2">
                  <form
                    action={async () => {
                      "use server"
                      await updateCorrectionStatus(correction.id, "approved", correction.languageSlug || "")
                    }}
                  >
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                      disabled={correction.status !== "pending"}
                    >
                      Approuver
                    </button>
                  </form>
                  <form
                    action={async () => {
                      "use server"
                      await updateCorrectionStatus(correction.id, "rejected", correction.languageSlug || "")
                    }}
                  >
                    <button
                      type="submit"
                      className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
                      disabled={correction.status !== "pending"}
                    >
                      Rejeter
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

