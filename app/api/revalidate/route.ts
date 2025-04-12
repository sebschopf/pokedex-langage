import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

/**
 * Route API pour revalider les pages après des modifications dans Supabase
 * Peut être configurée avec des webhooks Supabase
 */
export async function POST(request: NextRequest) {
  try {
    // Vérifier le secret pour sécuriser l'endpoint
    const secret = request.headers.get("x-revalidate-secret")
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 401 })
    }

    const body = await request.json()

    // Extraire les informations du webhook
    const { table, record, type } = body

    // Revalider les chemins appropriés en fonction de la table modifiée
    if (table === "languages") {
      // Revalider la page d'accueil et la page de détail du langage
      revalidatePath("/")
      if (record?.slug) {
        revalidatePath(`/language/${record.slug}`)
      }
    } else if (table === "libraries") {
      // Revalider la page du langage associé
      if (record?.language_id) {
        // Récupérer le slug du langage à partir de l'ID
        const { createServerSupabaseClient } = await import("@/lib/server/supabase/client")
        const supabase = createServerSupabaseClient()

        const { data: language } = await supabase.from("languages").select("slug").eq("id", record.language_id).single()

        if (language?.slug) {
          revalidatePath(`/language/${language.slug}`)
        } else {
          // Si on ne peut pas trouver le slug, revalidons toutes les pages
          revalidatePath("/")
        }
      }
    } else if (table === "corrections") {
      // Revalider la page d'administration des corrections
      revalidatePath("/admin/suggestions")
    } else if (table === "language_proposals") {
      // Revalider la page d'administration des propositions
      revalidatePath("/admin/suggestions")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Revalidation déclenchée pour la table ${table}`,
    })
  } catch (error) {
    console.error("Erreur lors de la revalidation:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de la revalidation",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
