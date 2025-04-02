"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { User, Upload, Loader2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

interface AvatarUploadProps {
  userId: string
  avatarUrl: string | null
  onAvatarChange?: (url: string) => void
  size?: "sm" | "md" | "lg"
}

export default function AvatarUpload({
  userId,
  avatarUrl,
  onAvatarChange,
  size = "md",
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [avatarPath, setAvatarPath] = useState<string | null>(avatarUrl)
  const supabase = createClientComponentClient()

  // Tailles d'avatar en fonction de la prop size
  const avatarSizes = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  }

  useEffect(() => {
    setAvatarPath(avatarUrl)
  }, [avatarUrl])

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image à télécharger.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const filePath = `${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`

      // Vérifier la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("L'image ne doit pas dépasser 2MB.")
      }

      // Vérifier le type de fichier
      if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) {
        throw new Error("Le fichier doit être une image (JPEG, PNG, GIF, WEBP).")
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      // Obtenir l'URL publique
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)
      const newAvatarUrl = data.publicUrl

      // Mettre à jour le profil utilisateur avec la nouvelle URL d'avatar
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      setAvatarPath(newAvatarUrl)
      
      if (onAvatarChange) {
        onAvatarChange(newAvatarUrl)
      }

      toast({
        title: "Avatar mis à jour",
        description: "Votre avatar a été mis à jour avec succès.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors du téléchargement de l'avatar.",
      })
      console.error("Erreur:", error)
    } finally {
      setUploading(false)
    }
  }

  const removeAvatar = async () => {
    try {
      setUploading(true)

      // Mettre à jour le profil utilisateur pour supprimer l'URL d'avatar
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }

      setAvatarPath(null)
      
      if (onAvatarChange) {
        onAvatarChange("")
      }

      toast({
        title: "Avatar supprimé",
        description: "Votre avatar a été supprimé avec succès.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la suppression de l'avatar.",
      })
      console.error("Erreur:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className={avatarSizes[size]}>
        {avatarPath ? (
          <AvatarImage src={avatarPath} alt="Avatar" />
        ) : (
          <AvatarFallback>
            <User className="h-1/2 w-1/2" />
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="relative"
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Upload className="h-4 w-4 mr-1" />
              Changer
            </>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </Button>

        {avatarPath && (
          <Button
            variant="outline"
            size="sm"
            onClick={removeAvatar}
            disabled={uploading}
          >
            <X className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  )
}