import SearchBar from "@/components/search-bar"
import FilterBar from "@/components/filter-bar"
import { LanguageGrid } from "@/components/language-grid"
import { AuthButton } from "@/components/auth-button"
import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/server/supabase/client"

// Revalider la page toutes les heures
export const revalidate = 3600

export default async function Home() {
  try {
    // Vérifier si l'utilisateur est connecté
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const isLoggedIn = !!session

    // Récupérer le rôle de l'utilisateur si connecté
    let userRole = null
    if (session) {
      const { data: roleData } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()
      userRole = roleData?.role
    }

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-black uppercase tracking-tighter lcp-title">
            Pokedex des langages
          </h1>
          <div className="flex gap-4">
            <AuthButton />

            {/* N'afficher le lien vers le profil que si l'utilisateur est connecté */}
            {isLoggedIn && (
              <Link
                href="/profile"
                className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-blue-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                Profil
              </Link>
            )}

            <Link
              href="/about"
              className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              À propos
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <SearchBar />
          <FilterBar />
        </div>

        <LanguageGrid />
      </div>
    )
  } catch (error) {
    console.error("Erreur dans la page d'accueil:", error)
    return (
      <div className="space-y-8">
        <h1 className="text-5xl md:text-7xl font-black mb-4 text-black uppercase tracking-tighter">
          Pokedex des langages
        </h1>
        <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xl">Une erreur est survenue lors du chargement des données.</p>
          <p>Veuillez réessayer ultérieurement.</p>
        </div>
      </div>
    )
  }
}
