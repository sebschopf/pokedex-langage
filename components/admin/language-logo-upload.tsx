"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { toNumberOrNull } from "@/utils/conversion/type-conversion"

export interface LanguageLogoUploadProps {
  languageId: string | number
  languageName?: string
  onSuccess?: () => void
}

export function LanguageLogoUpload({ languageId, languageName, onSuccess }: LanguageLogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return
      }

      const file = acceptedFiles[0]
      setIsUploading(true)
      setError(null)

      try {
        const supabase = createBrowserClient()

        // Convertir languageId en nombre
        const numericLanguageId = toNumberOrNull(languageId)
        if (numericLanguageId === null) {
          throw new Error("ID de langage invalide")
        }

        // Utiliser le nom du langage pour le nom du fichier si disponible
        const fileName = languageName
          ? `${languageName.toLowerCase().replace(/\s+/g, "-")}.${file.name.split(".").pop()}`
          : `language-${numericLanguageId}.${file.name.split(".").pop()}`

        const { data, error } = await supabase.storage.from("logos").upload(`languages/${fileName}`, file, {
          upsert: true,
          contentType: file.type,
        })

        if (error) {
          throw error
        }

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage.from("logos").getPublicUrl(`languages/${fileName}`)

        setUploadedImageUrl(urlData.publicUrl)

        // Mettre à jour le langage avec l'URL du logo
        // Vérifier dans database-types.ts quel est le nom correct du champ pour le logo
        const { error: updateError } = await supabase
          .from("languages")
          .update({
            // Utiliser logo_path au lieu de logo_url, selon le schéma de la base de données
            logo_path: urlData.publicUrl,
          })
          .eq("id", numericLanguageId)

        if (updateError) {
          throw updateError
        }

        if (onSuccess) {
          onSuccess()
        }
      } catch (err) {
        console.error("Erreur lors de l'upload:", err)
        setError("Une erreur est survenue lors de l'upload du logo")
      } finally {
        setIsUploading(false)
      }
    },
    [languageId, languageName, onSuccess],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer ${
          isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le logo ici...</p>
        ) : (
          <div>
            <p>Glissez et déposez un logo ici, ou cliquez pour sélectionner un fichier</p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG ou SVG (max: 2MB)</p>
          </div>
        )}
      </div>

      {isUploading && <p className="text-center">Upload en cours...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {uploadedImageUrl && (
        <div className="text-center">
          <p className="text-green-500 mb-2">Logo uploadé avec succès!</p>
          <div className="flex justify-center">
            <img src={uploadedImageUrl || "/placeholder.svg"} alt="Logo uploadé" className="max-h-32 max-w-full" />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Upload en cours..." : "Sélectionner un logo"}
        </Button>
      </div>
    </div>
  )
}
