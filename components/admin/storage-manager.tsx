"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { Trash2, Upload, RefreshCw, FolderOpen, Plus } from "lucide-react"
import FileUpload from "../file-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface StorageItem {
  name: string
  url: string
  isFolder?: boolean
}

interface StorageManagerProps {
  bucket?: string
  path?: string
  onSelect?: (url: string) => void
  maxSizeMB?: number
  acceptedFileTypes?: string
}

export default function StorageManager({
  bucket = "logos",
  path = "",
  onSelect,
  maxSizeMB = 2,
  acceptedFileTypes = "image/*",
}: StorageManagerProps) {
  const [files, setFiles] = useState<StorageItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPath, setCurrentPath] = useState(path)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const { toast } = useToast()

  const loadFiles = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await withTokenRefresh(async () => {
        const supabase = createBrowserClient()

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
      })
    } catch (err) {
      console.error("Erreur lors du chargement des fichiers:", err)
      setError("Erreur lors du chargement des fichiers")
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les fichiers. Veuillez réessayer.",
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
      await withTokenRefresh(async () => {
        const supabase = createBrowserClient()

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
      })
    } catch (err) {
      console.error("Erreur lors de la suppression du fichier:", err)
      setError("Erreur lors de la suppression du fichier")
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le fichier. Veuillez réessayer.",
      })
    }
  }

  const handleUploadComplete = (url: string) => {
    // Recharger les fichiers après téléchargement
    loadFiles()
    setShowUploadForm(false)
    toast({
      title: "Téléchargement réussi",
      description: "Le fichier a été téléchargé avec succès.",
    })
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

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom du dossier ne peut pas être vide.",
      })
      return
    }

    try {
      await withTokenRefresh(async () => {
        const supabase = createBrowserClient()
        const folderPath = currentPath ? `${currentPath}/${newFolderName}/.gitkeep` : `${newFolderName}/.gitkeep`

        // Créer un fichier vide pour simuler un dossier
        const { error } = await supabase.storage.from(bucket).upload(folderPath, new Blob([""]), {
          contentType: "text/plain",
        })

        if (error) throw error

        toast({
          title: "Dossier créé",
          description: `Le dossier ${newFolderName} a été créé avec succès.`,
        })

        setNewFolderName("")
        setShowCreateFolderDialog(false)
        loadFiles()
      })
    } catch (err) {
      console.error("Erreur lors de la création du dossier:", err)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le dossier. Veuillez réessayer.",
      })
    }
  }

  return (
    <div className="border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestionnaire de stockage</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateFolderDialog(true)}
            className="border-2 border-black bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouveau dossier
          </Button>
          <Button
            onClick={loadFiles}
            className="p-2 bg-gray-200 hover:bg-gray-300 border-2 border-black"
            aria-label="Rafraîchir"
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          {currentPath && (
            <Button
              onClick={navigateUp}
              className="p-2 bg-gray-200 hover:bg-gray-300 border-2 border-black"
              aria-label="Dossier parent"
              variant="outline"
              size="sm"
            >
              <FolderOpen className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Chemin actuel: {currentPath || "/"}</p>
        {!showUploadForm ? (
          <Button
            onClick={() => setShowUploadForm(true)}
            className="bg-gray-200 hover:bg-gray-300 border-2 border-black text-black"
          >
            <Upload className="h-4 w-4 mr-2" />
            Télécharger un fichier
          </Button>
        ) : (
          <FileUpload
            bucket={bucket}
            path={currentPath}
            onUploadComplete={handleUploadComplete}
            onCancel={() => setShowUploadForm(false)}
            acceptedFileTypes={acceptedFileTypes}
            maxSizeMB={maxSizeMB}
          />
        )}
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
                    <FolderOpen className="h-8 w-8" />
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
                        <Upload className="h-6 w-6 mx-auto mb-1" />
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
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Dialog open={showCreateFolderDialog} onOpenChange={setShowCreateFolderDialog}>
        <DialogContent className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau dossier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nom du dossier"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="border-2 border-black"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateFolderDialog(false)}
              className="border-2 border-black"
            >
              Annuler
            </Button>
            <Button
              onClick={handleCreateFolder}
              className="bg-gray-200 hover:bg-gray-300 border-2 border-black text-black"
            >
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
