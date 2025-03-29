// Type pour les données des frameworks
export interface Framework {
  name: string
  description: string
  usedFor: string
  features: string[]
  officialWebsite: string
  uniqueSellingPoint: string
  bestFor: string
  version?: string
  documentation?: string
  resources?: { name: string; url: string }[]
}

