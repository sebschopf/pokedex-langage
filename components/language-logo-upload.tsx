"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getPublicFileUrl } from "@/utils"

interface LanguageLogoUploadProps {
  languageId: string
  initialLogoPath?: string | null
  onLogoUploaded: (logoPath: string | null) => void // Modifié pour accepter null
}

const LanguageLogoUpload: React.FC<LanguageLogoUploadProps> = ({ languageId, initialLogoPath, onLogoUploaded }) => {
  const [logoPath, setLogoPath] = useState<string | null>(initialLogoPath || null)
  const [uploading, setUploading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const logoUrl = logoPath ? getPublicFileUrl("logos", logoPath) : null

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    await uploadFile(files[0])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files.length === 0) return

    await uploadFile(files[0])
  }

  const uploadFile = async (file: File) => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${languageId}.${fileExt}`
    const filePath = `logos/${fileName}`

    setUploading(true)

    try {
      const res = await fetch(`/api/upload-logo`, {
        method: "POST",
        body: JSON.stringify({
          file: file,
          name: fileName,
          type: file.type,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to upload image: ${res.statusText}`)
      }

      setLogoPath(fileName)
      onLogoUploaded(fileName)

      toast({
        title: "Logo uploaded successfully!",
        description: "The language logo has been updated.",
      })
    } catch (error: any) {
      console.error("Upload error:", error)
      toast({
        variant: "destructive",
        title: "Failed to upload logo.",
        description: error.message,
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveLogo = async () => {
    if (!logoPath) return

    setUploading(true)

    try {
      const res = await fetch(`/api/delete-logo`, {
        method: "POST",
        body: JSON.stringify({
          filePath: `logos/${logoPath}`,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to delete image: ${res.statusText}`)
      }

      setLogoPath(null)
      onLogoUploaded(null) // Maintenant accepte null

      toast({
        title: "Logo removed successfully!",
        description: "The language logo has been removed.",
      })
    } catch (error: any) {
      console.error("Delete error:", error)
      toast({
        variant: "destructive",
        title: "Failed to remove logo.",
        description: error.message,
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="logo">Language Logo</Label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            isDragActive ? "border-indigo-500" : "border-gray-300"
          }`}
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      {logoUrl && (
        <div className="mb-4">
          <Label>Current Logo</Label>
          <img
            src={logoUrl || "/placeholder.svg"}
            alt="Language Logo"
            className="mt-2 rounded-md w-32 h-32 object-cover"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        {logoPath && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={uploading}>
                Remove Logo
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the language logo from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemoveLogo} disabled={uploading}>
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {uploading && <p>Uploading...</p>}
      </div>
    </div>
  )
}

export default LanguageLogoUpload
