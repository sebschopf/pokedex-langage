"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Trash2, Upload, RefreshCw, FolderOpen, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import FileUpload from "./file-upload"

interface File {
  name: string
  url: string
  isFolder?: boolean
}

interface StorageManagerProps {
  bucket?: string
  path?: string
  onSelect?: (url: string) => void
  allowDelete?: boolean
  allowUpload?: boolean
}

export default function StorageManager({
  bucket = "logos",
  path = "",
  onSelect,
  allowDelete = true,
  allowUpload = true,
}: StorageManagerProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState(path)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClientComponentClient()

  const loadFiles = async () => {
    setIsLoading(true)
    setError(null)

    try {
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
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les fichiers",
      })
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
      const { error } = await supabase.storage
        .from(bucket)
        .remove([`${currentPath ? `${currentPath}/` : ""}${fileName}`])

      if (error) throw error

      toast({
        title: "Fichier supprimé",
        description: `${fileName} a été supprimé avec succès.`,
      })

      // Recharger les fichiers après suppression
      loadFiles()
    } catch (err) {
      console.error("Erreur lors de la suppression du fichier:", err)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le fichier",
      })
    }
  }

  const handleUploadComplete = () => {
    // Recharger les fichiers après téléchargement
    loadFiles()
    setIsUploading(false)
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">Gestionnaire de fichiers</h2>
          {currentPath && (
            <Button variant="ghost" size="sm" onClick={navigateUp}>
              <ArrowUp className="h-4 w-4 mr-1" />
              Remonter
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          {allowUpload && (
            <Button variant="outline" size="sm" onClick={() => setIsUploading(!isUploading)}>
              <Upload className="h-4 w-4 mr-1" />
              Télécharger
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={loadFiles}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Actualiser
          </Button>
        </div>
      </div>

      {currentPath && (
        <div className="bg-muted p-2 rounded-md text-sm">
          Chemin actuel:{" "}
          <span className="font-mono">
            {bucket}/{currentPath}
          </span>
        </div>
      )}

      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <FileUpload
              bucket={bucket}
              path={currentPath}
              onUploadComplete={handleUploadComplete}
              onCancel={() => setIsUploading(false)}
            />
          </CardContent>
        </Card>
      )}

      {error && <div className="bg-red-100 border-2 border-red-400 text-red-700 p-2 rounded-md">{error}</div>}

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-2 border-gray-200 p-2 rounded-md">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-8">Aucun fichier trouvé</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className={`
                  border-2 border-gray-200 p-2 rounded-md flex flex-col
                  ${selectedFile === file.url ? "bg-yellow-50 border-yellow-400" : "bg-white"}
                  ${file.isFolder ? "cursor-pointer hover:bg-gray-50" : ""}
                `}
                onClick={() => (file.isFolder ? navigateToFolder(file.name) : handleFileSelect(file.url))}
              >
                {file.isFolder ? (
                  <div className="flex items-center justify-center h-24 bg-gray-50 rounded-md">
                    <FolderOpen size={32} className="text-gray-400" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 bg-gray-50 rounded-md">
                    {file.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i) ? (
                      <img
                        src={file.url || "/placeholder.svg"}
                        alt={file.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-sm text-gray-500">
                        <Upload size={24} className="mx-auto mb-1" />
                        Fichier
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm truncate" title={file.name}>
                    {file.name}
                  </span>
                  {!file.isFolder && allowDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteFile(file.name)
                      }}
                    >
                      <Trash2 size={14} className="text-red-500" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
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
