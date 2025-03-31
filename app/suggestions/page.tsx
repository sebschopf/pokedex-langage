// app/suggestions/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createServerSupabaseClient } from "@/lib/supabase"
import { getLanguages } from "@/lib/data"
import { redirect } from "next/navigation"
import { CorrectionForm } from "../admin/suggestions/correction-form"
import { ProposalForm } from "../admin/suggestions/proposal-form"

export const metadata = {
  title: "Contribuer | POKEDEX_DEV",
  description: "Proposez des corrections ou suggérez de nouveaux langages de programmation",
}

export default async function SuggestionsPage() {
  const supabase = createServerSupabaseClient()
  
  // Vérifier si l'utilisateur est connecté
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirect=/suggestions")
  }

  // Récupérer le rôle de l'utilisateur
  const { data: userRole } = await supabase.from("user_roles").select("role").eq("id", session.user.id).single()

  // Vérifier si l'utilisateur a au moins le rôle "registered"
  if (!userRole || userRole.role === "anonymous") {
    redirect("/profile?message=Vous devez compléter votre profil pour contribuer")
  }

  // Récupérer les langages pour le formulaire de correction
  const languages = await getLanguages()

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Contribuer au Pokedex</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Aidez-nous à améliorer notre base de données de langages de programmation en proposant des corrections
            ou en suggérant de nouveaux langages.
          </p>
        </div>

        <Tabs defaultValue="correction" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 border-4 border-black">
            <TabsTrigger value="correction" className="text-lg font-bold py-2">
              Corriger un langage existant
            </TabsTrigger>
            <TabsTrigger value="proposal" className="text-lg font-bold py-2">
              Proposer un nouveau langage
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="correction">
            <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-semibold mb-4">Corriger un langage existant</h2>
              <CorrectionForm languages={languages} />
            </div>
          </TabsContent>
          
          <TabsContent value="proposal">
            <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-semibold mb-4">Proposer un nouveau langage</h2>
              <ProposalForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}