"use client"

import { useState, useEffect } from "react"
import { createSupabaseClient } from "@/lib/supabase"
import { Trash2, Upload, RefreshCw, FolderOpen } from "lucide-react"
import FileUpload from "../file-upload"

interface StorageManagerProps {
  bucket?: string
  path?: string
  onSelect?: (url: string) => void
}

export default function StorageManager({ bucket = "logos", path = "", onSelect }: StorageManagerProps) {
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState(path)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const loadFiles = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseClient()

      const { data, error } = await supabase.storage.from(bucket).list(currentPath, {
        sortBy: { column: "name", order: "asc" },
      })

      if (error) throw error

      // Filtrer les dossiers et les fichiers
      const folders = data?.filter((item) => item.id === null) || []
      const fileItems = data?.filter((item) => item.id !== null) || []

      // Obtenir les URLs publiques pour les fichiers
      const filesWithUrls = await Promise.all(
        fileItems.map(async (file) => {
          const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(`${currentPath ? `${currentPath}/` : ""}${file.name}`)

          return {
            name: file.name,
            url: data.publicUrl,
          }
        }),
      )

      setFiles([
        // Ajouter les dossiers d'abord
        ...folders.map((folder) => ({
          name: folder.name,
          url: "",
          isFolder: true,
        })),
        // Puis les fichiers
        ...filesWithUrls,
      ])
    } catch (err) {
      console.error("Erreur lors du chargement des fichiers:", err)
      setError("Erreur lors du chargement des fichiers")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [bucket, currentPath])

  const handleFileSelect = (url: string) => {
    setSelectedFile(url)
    if (onSelect) {
      onSelect(url)
    }
  }

  const handleDeleteFile = async (fileName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${fileName} ?`)) {
      return
    }

    try {
      const supabase = createSupabaseClient()

      const { error } = await supabase.storage
        .from(bucket)
        .remove([`${currentPath ? `${currentPath}/` : ""}${fileName}`])

      if (error) throw error

      // Recharger les fichiers après suppression
      loadFiles()
    } catch (err) {
      console.error("Erreur lors de la suppression du fichier:", err)
      setError("Erreur lors de la suppression du fichier")
    }
  }

  const handleUploadComplete = () => {
    // Recharger les fichiers après téléchargement
    loadFiles()
  }

  const navigateToFolder = (folderName: string) => {
    setCurrentPath(currentPath ? `${currentPath}/${folderName}` : folderName)
  }

  const navigateUp = () => {
    if (!currentPath) return

    const pathParts = currentPath.split("/")
    pathParts.pop()
    setCurrentPath(pathParts.join("/"))
  }

  return (
    <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestionnaire de stockage</h2>
        <div className="flex gap-2">
          <button
            onClick={loadFiles}
            className="p-2 bg-gray-200 hover:bg-gray-300 border-2 border-black"
            aria-label="Rafraîchir"
          >
            <RefreshCw size={16} />
          </button>
          {currentPath && (
            <button
              onClick={navigateUp}
              className="p-2 bg-gray-200 hover:bg-gray-300 border-2 border-black"
              aria-label="Dossier parent"
            >
              <FolderOpen size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Chemin actuel: {currentPath || "/"}</p>
        <FileUpload onUploadComplete={handleUploadComplete} bucket={bucket} accept="image/svg+xml,image/*" />
      </div>

      {error && <div className="bg-red-100 border-2 border-red-400 text-red-700 p-2 mb-4">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Chargement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">Aucun fichier trouvé</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className={`
                  border-2 border-black p-2 flex flex-col
                  ${selectedFile === file.url ? "bg-yellow-100" : "bg-white"}
                  ${file.isFolder ? "cursor-pointer hover:bg-gray-100" : ""}
                `}
                onClick={() => (file.isFolder ? navigateToFolder(file.name) : handleFileSelect(file.url))}
              >
                {file.isFolder ? (
                  <div className="flex items-center justify-center h-24 bg-gray-100">
                    <FolderOpen size={32} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 bg-gray-100">
                    {file.url.endsWith(".svg") || file.url.includes("image") ? (
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-sm">
                        <Upload size={24} className="mx-auto mb-1" />
                        Fichier
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs truncate" title={file.name}>
                    {file.name}
                  </p>
                  {!file.isFolder && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteFile(file.name)
                      }}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      aria-label={`Supprimer ${file.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

