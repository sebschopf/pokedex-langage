export interface Language {
  id: string
  name: string
  logo: string
  shortDescription: string
  type: "Frontend" | "Backend" | "Fullstack" | "Mobile" | "Data" | "Business"
  usedFor: string
  usageRate: number
  createdYear: number
  popularFrameworks: string[]
  strengths: string[]
  // Propriétés optionnelles
  difficulty?: 1 | 2 | 3 | 4 | 5 // Niveau de difficulté de 1 à 5
  isOpenSource?: boolean // Indique si le langage est open-source
  tools?: {
    parsers?: string[]
    validators?: string[]
    templateEngines?: string[]
    [key: string]: string[] | undefined
  }
  // Autres propriétés optionnelles qui peuvent être présentes
  currentVersion?: string
  lastUpdated?: string
  license?: string
}

