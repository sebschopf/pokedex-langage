"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { useToast } from "@/hooks/use-toast"
import { Upload, Trash2 } from "lucide-react"

interface AvatarUploadProps {
  userId: string
  avatarUrl: string | null
  onAvatarChange?: (url: string) => void
  size?: "sm" | "md" | "lg" | "xl"
}

export default function AvatarUpload({ userId, avatarUrl, onAvatarChange, size = "md" }: AvatarUploadProps) {
  const [avatarPath, setAvatarPath] = useState<string | null>(avatarUrl)
  const [uploading, setUploading] = useState(false)
  const supabase = createBrowserClient()
  const { toast } = useToast()

  useEffect(() => {
    if (avatarUrl !== avatarPath) {
      setAvatarPath(avatarUrl)
    }
  }, [avatarUrl, avatarPath])

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image à télécharger.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = fileName

      // Vérifier la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("L'image ne doit pas dépasser 2MB.")
      }

      // Vérifier le type de fichier
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
        throw new Error("Le fichier doit être une image (JPEG, PNG, GIF, WEBP).")
      }

      // Télécharger le fichier dans le bucket avatars
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw new Error(`Erreur lors du téléchargement: ${uploadError.message}`)
      }

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath)

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Impossible d'obtenir l'URL publique de l'avatar")
      }

      const newAvatarUrl = urlData.publicUrl

      // Mettre à jour le profil utilisateur avec la nouvelle URL d'avatar
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", userId)

      if (updateError) {
        throw new Error(`Erreur lors de la mise à jour du profil: ${updateError.message}`)
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
    } finally {
      setUploading(false)
    }
  }

  const removeAvatar = async () => {
    try {
      setUploading(true)

      // Mettre à jour le profil utilisateur pour supprimer l'URL d'avatar
      const { error: updateError } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId)

      if (updateError) {
        throw new Error(`Erreur lors de la suppression de l'avatar: ${updateError.message}`)
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
    } finally {
      setUploading(false)
    }
  }

  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={avatarPath || undefined} alt="Avatar" />
        <AvatarFallback>{userId.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      {size !== "sm" && (
        <div className="flex gap-2 mt-2">
          <Button type="button" variant="outline" size="sm" className="relative" disabled={uploading}>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={uploadAvatar}
              accept="image/jpeg,image/png,image/gif,image/webp"
              disabled={uploading}
            />
            <Upload className="h-4 w-4 mr-1" />
            {uploading ? "Téléchargement..." : "Télécharger"}
          </Button>

          {avatarPath && (
            <Button type="button" variant="outline" size="sm" onClick={removeAvatar} disabled={uploading}>
              <Trash2 className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
