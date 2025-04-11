// Mapping des noms de langages vers leurs noms de fichiers d'image
const languageImageMap: Record<string, string> = {
    "C++": "cpp",
    "C#": "csharp",
    "F#": "fsharp",
    // Ajoutez d'autres mappings spéciaux ici ↑
  }
  
  /**
   * Convertit le nom d'un langage en nom de fichier d'image
   * @param name Nom du langage
   * @returns Nom du fichier d'image
   */
  export function getImageName(name: string): string {
    // Vérifier si le langage a un mapping spécial
    if (languageImageMap[name]) {
      return languageImageMap[name]
    }
    
    // Sinon, convertir en minuscules et supprimer les caractères spéciaux
    return name.toLowerCase().replace(/[^a-z0-9]/g, "")
  }