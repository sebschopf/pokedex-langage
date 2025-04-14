// Fonctions client pour interagir avec l'API

// ===== LANGAGES =====

export async function fetchLanguages() {
    try {
      const response = await fetch("/api/language")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des langages")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return []
    }
  }
  
  export async function fetchLanguageById(id: number) {
    try {
      const response = await fetch(`/api/language/${id}`)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du langage")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return null
    }
  }
  
  export async function fetchLanguageBySlug(slug: string) {
    try {
      const response = await fetch(`/api/language/slug/${slug}`)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du langage")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return null
    }
  }
  
  export async function createLanguageClient(languageData: any) {
    try {
      const response = await fetch("/api/language", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(languageData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la création du langage")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  
  export async function updateLanguageClient(id: number, languageData: any) {
    try {
      const response = await fetch(`/api/language/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(languageData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la mise à jour du langage")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  
  export async function deleteLanguageClient(id: number) {
    try {
      const response = await fetch(`/api/language/${id}`, {
        method: "DELETE",
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la suppression du langage")
      }
  
      return true
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  
  export async function fetchFrameworksByLanguageId(languageId: number) {
    try {
      const response = await fetch(`/api/language/frameworks?languageId=${languageId}`)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des frameworks")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return []
    }
  }
  
  // ===== BIBLIOTHÈQUES =====
  
  export async function fetchLibraries(languageId?: number) {
    try {
      const url = languageId ? `/api/library?languageId=${languageId}` : "/api/library"
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des bibliothèques")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return []
    }
  }
  
  export async function fetchLibraryById(id: number) {
    try {
      const response = await fetch(`/api/library/${id}`)
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la bibliothèque")
      }
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      return null
    }
  }
  
  export async function createLibraryClient(libraryData: any) {
    try {
      const response = await fetch("/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libraryData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la création de la bibliothèque")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  
  export async function updateLibraryClient(id: number, libraryData: any) {
    try {
      const response = await fetch(`/api/library/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libraryData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la mise à jour de la bibliothèque")
      }
  
      return await response.json()
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  
  export async function deleteLibraryClient(id: number) {
    try {
      const response = await fetch(`/api/library/${id}`, {
        method: "DELETE",
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la suppression de la bibliothèque")
      }
  
      return true
    } catch (error) {
      console.error("Erreur:", error)
      throw error
    }
  }
  