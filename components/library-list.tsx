"use client"

interface LibraryListProps {
  libraries: string[]
  frameworkName: string
  libraryData: Record<string, any>
}

export default function LibraryList({ libraries, frameworkName, libraryData }: LibraryListProps) {
  // Données par défaut pour les bibliothèques non listées
  const defaultLibraryData = (name: string) => ({
    name,
    description: `Bibliothèque populaire pour ${frameworkName}`,
    usedFor: "Extension des fonctionnalités de base",
    features: ["Intégration avec " + frameworkName, "Facilité d'utilisation", "Documentation"],
    officialWebsite: `https://www.google.com/search?q=${name}+${frameworkName}+library`,
    uniqueSellingPoint: `Extension spécialisée pour ${frameworkName}`,
    bestFor: `Projets ${frameworkName} nécessitant des fonctionnalités supplémentaires`,
    version: "N/A",
  })

  return (
    <div className="mt-3 border-t-2 border-black pt-3">
      <h6 className="font-bold text-sm mb-2">Bibliothèques populaires:</h6>
      <div className="space-y-2">
        {libraries.map((lib, index) => {
          const libData = libraryData[lib] || defaultLibraryData(lib)

          return (
            <div key={index} className="border-2 border-black p-2 bg-gray-50">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">{lib}</span>
                {libData.version && libData.version !== "N/A" && (
                  <span className="text-xs bg-gray-200 px-1">v{libData.version}</span>
                )}
              </div>
              <p className="text-xs mb-1">{libData.description}</p>
              <p className="text-xs font-bold text-blue-800">{libData.uniqueSellingPoint}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

