"use client"

import type React from "react"

import { useState, useRef } from "react"
import { uploadFileAction } from "@/app/actions/upload-actions"
import { cn } from "@/lib/utils"
import { Upload, X, Loader2 } from "lucide-react"

interface FileUploadProps {
  onUploadComplete: (url: string) => void
  currentFileUrl?: string
  className?: string
  accept?: string
  bucket?: string
}

export default function FileUpload({
  onUploadComplete,
  currentFileUrl,
  className,
  accept = "image/svg+xml,image/*",
  bucket = "logos",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentFileUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      // Créer un aperçu local
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)

      // Créer un FormData pour l'upload
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", bucket)

      // Envoyer le fichier
      const result = await uploadFileAction(formData)

      if (result.success && result.url) {
        onUploadComplete(result.url)
      } else {
        setError(result.message || "Erreur lors du téléchargement")
        setPreview(currentFileUrl || null)
      }
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err)
      setError("Une erreur est survenue lors du téléchargement")
      setPreview(currentFileUrl || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    setPreview(null)
    onUploadComplete("")
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <label
          className={cn(
            "flex flex-col items-center justify-center w-32 h-32 border-4 border-dashed rounded-lg cursor-pointer",
            isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
            error ? "border-red-500" : "border-gray-300",
          )}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : preview ? (
            <img src={preview || "/placeholder.svg"} alt="Aperçu" className="object-contain w-full h-full" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="mt-2 text-xs text-gray-500">Cliquez pour télécharger</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {preview && (
          <button
            type="button"
            onClick={handleClearFile}
            className="p-1 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

