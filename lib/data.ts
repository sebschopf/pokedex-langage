import type { Language } from "@/types/language"
import { languages } from "./languages"

// Fonction pour récupérer les données des langages
export async function getLanguages(): Promise<Language[]> {
  // Dans un environnement réel, vous chargeriez les données depuis une base de données ou une API
  return languages
}

