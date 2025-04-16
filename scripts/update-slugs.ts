import { createClient } from "@supabase/supabase-js"
import { generateLanguageSlug } from "@/utils"

// Fonction pour mettre à jour les slugs dans la base de données
async function updateSlugs() {
  // Créer un client Supabase avec les variables d'environnement
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Récupérer tous les langages
  const { data: languages, error } = await supabase.from("languages").select("id, name, slug")

  if (error) {
    console.error("Erreur lors de la récupération des langages:", error)
    return
  }

  // Mettre à jour les slugs
  let updatedCount = 0
  for (const language of languages) {
    const newSlug = generateLanguageSlug(language.name)

    // Ne mettre à jour que si le slug est différent
    if (newSlug !== language.slug) {
      const { error: updateError } = await supabase.from("languages").update({ slug: newSlug }).eq("id", language.id)

      if (updateError) {
        console.error(`Erreur lors de la mise à jour du slug pour ${language.name}:`, updateError)
      } else {
        console.log(`Slug mis à jour pour ${language.name}: ${language.slug} -> ${newSlug}`)
        updatedCount++
      }
    }
  }

  console.log(`Mise à jour terminée. ${updatedCount} slugs ont été mis à jour.`)
}

// Exécuter la fonction
updateSlugs().catch(console.error)
