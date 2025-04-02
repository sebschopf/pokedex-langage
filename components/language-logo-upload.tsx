"use client"

import { useState } from "react"
import FileUpload from "@/components/file-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPublicUrl, StorageBucket } from "@/utils/storage-helpers"
import Image from "next/image"

interface LanguageLogoUploadProps {
  languageId: string
  currentLogoPath?: string | null
  onUpload: (path: string) => void
}

export function LanguageLogoUpload({
  languageId,
  currentLogoPath,
  onUpload
}: LanguageLogoUploadProps) {
  const [logoPath, setLogoPath] = useState<string | null>(currentLogoPath || null)
  
  const handleUploadComplete = (path: string) => {
    setLogoPath(path)
    onUpload(path)
  }
  
  // Obtenir l'URL publique si un logo existe
  const logoUrl = logoPath ? getPublicUrl("logos" as StorageBucket, logoPath) : null
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo du langage</CardTitle>
        <CardDescription>
          Téléchargez un logo SVG pour représenter ce langage de programmation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logoUrl && (
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-gray-50 rounded-md">
              {/* Utilisation de next/image pour les SVG avec un objectFit approprié */}
              <Image 
                src={logoUrl || "/placeholder.svg"} 
                alt="Logo du langage" 
                width={100} 
                height={100}
                style={{ objectFit: 'contain' }}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        )}
        
        <FileUpload
          bucket={"logos" as StorageBucket}
          onUploadComplete={handleUploadComplete}
          path={languageId}
          acceptedFileTypes="image/svg+xml" // Limité aux fichiers SVG uniquement
          maxSizeMB={1} // Les SVG sont généralement légers
        />
      </CardContent>
    </Card>
  )
}