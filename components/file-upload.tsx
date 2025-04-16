"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  bucket: string
  path?: string
  onUploadComplete?: (url: string) => void
  onCancel?: () => void
  acceptedFileTypes?: string
  maxSizeMB?: number
}

export default function FileUpload({
  bucket,
  path = "",
  onUploadComplete,
  onCancel,
  acceptedFileTypes = "image/*",
  maxSizeMB = 2,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createBrowserClient()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null)
      return
    }

    const file = e.target.files[0]

    // Vérifier la taille du fichier
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Fichier trop volumineux",
        description: `La taille du fichier ne doit pas dépasser ${maxSizeMB}MB.`,
      })
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setProgress(0)

    try {
      // Générer un nom de fichier unique pour éviter les conflits
      const fileExt = selectedFile.name.split(".").pop()?.toLowerCase() || "png"
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
      const filePath = path ? `${path}/${fileName}` : fileName

      // Déterminer le type MIME
      let contentType = selectedFile.type
      if (!contentType || contentType === "application/octet-stream") {
        // Déterminer le type MIME basé sur l'extension
        if (fileExt === "png") contentType = "image/png"
        else if (fileExt === "jpg" || fileExt === "jpeg") contentType = "image/jpeg"
        else if (fileExt === "gif") contentType = "image/gif"
        else if (fileExt === "svg") contentType = "image/svg+xml"
      }

      // Télécharger le fichier avec le type MIME explicite
      const { data, error } = await supabase.storage.from(bucket).upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: contentType,
      })

      if (error) throw error

      // Simuler la progression
      setProgress(100)

      // Obtenir l'URL publique du fichier téléchargé
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)
      const publicUrl = urlData.publicUrl

      if (!publicUrl) {
        throw new Error("Impossible d'obtenir l'URL publique du fichier")
      }

      toast({
        title: "Téléchargement réussi",
        description: `Le fichier a été téléchargé avec succès.`,
      })

      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""

      // Appeler le callback avec l'URL publique
      if (onUploadComplete) {
        onUploadComplete(publicUrl)
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de téléchargement",
        description: error.message || "Une erreur est survenue lors du téléchargement du fichier.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (onCancel) onCancel()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Télécharger un fichier</h3>
        <Button variant="ghost" size="sm" onClick={handleCancel}>
          <X className="h-4 w-4 mr-1" />
          Annuler
        </Button>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
        <input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Cliquez pour sélectionner un fichier ou glissez-déposez</span>
          <span className="text-xs text-gray-400 mt-1">
            {acceptedFileTypes === "image/*" ? "Images uniquement" : acceptedFileTypes} (max: {maxSizeMB}MB)
          </span>
        </label>
      </div>

      {selectedFile && (
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-gray-500 text-right">{progress}%</div>
            </div>
          )}

          <div className="flex justify-end mt-2">
            <Button variant="default" size="sm" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-1" />
                  Télécharger
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
