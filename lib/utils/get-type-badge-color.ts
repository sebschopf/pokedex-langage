// Mapping des types de langages vers leurs couleurs
const typeBadgeColorMap: Record<string, string> = {
    "backend": "bg-purple-600",
    "frontend": "bg-blue-500",
    "fullstack": "bg-indigo-600",
    "mobile": "bg-red-500",
    "système": "bg-purple-600",
    "systeme": "bg-purple-600",
    // Valeur par défaut
    "default": "bg-gray-600"
  }
  
  /**
   * Obtient la classe de couleur pour un badge de type de langage
   * @param type Type de langage
   * @returns Classe CSS pour la couleur du badge
   */
  export function getTypeBadgeColor(type: string | null | undefined): string {
    if (!type) return typeBadgeColorMap.default
    
    const lowerType = type.toLowerCase()
    return typeBadgeColorMap[lowerType] || typeBadgeColorMap.default
  }