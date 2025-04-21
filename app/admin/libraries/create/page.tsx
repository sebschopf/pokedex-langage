"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { customToast } from "@/components/custom-toast" // Importez customToast au lieu de toast
import { generateSlug } from "@/utils/slugs"
import { isValidSlug } from "@/utils/slugs"

export default function CreateLibraryPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [isOpenSource, setIsOpenSource] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Générer automatiquement un slug à partir du nom
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    setSlug(generateSlug(newName))
  }

  // Permettre la modification manuelle du slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!name) {
      customToast({
        title: "Erreur",
        description: "Le nom est obligatoire",
        type: "error", // Utiliser type: "error" au lieu de variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    if (!slug) {
      customToast({
        title: "Erreur",
        description: "Le slug est obligatoire",
        type: "error",
      })
      setIsLoading(false)
      return
    }

    if (!isValidSlug(slug)) {
      customToast({
        title: "Erreur",
        description:
          "Le slug n'est pas valide. Utilisez uniquement des lettres minuscules, des chiffres et des tirets.",
        type: "error",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/libraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          description: description || null,
          isOpenSource,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Erreur lors de la création de la bibliothèque")
      }

      const data = await response.json()

      customToast({
        title: "Succès",
        description: "La bibliothèque a été créée avec succès",
        type: "success", // Utilisez type: "success" au lieu de variant: "success"
      })

      // Rediriger vers la page de détail de la bibliothèque
      router.push(`/admin/libraries/${data.id}`)
    } catch (error) {
      console.error("Erreur lors de la création de la bibliothèque:", error)
      customToast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle bibliothèque</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la bibliothèque</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom (obligatoire)</Label>
              <Input id="name" value={name} onChange={handleNameChange} placeholder="ex: React" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (obligatoire)</Label>
              <Input id="slug" value={slug} onChange={handleSlugChange} placeholder="ex: react" required />
              <p className="text-sm text-gray-500">
                Le slug est utilisé dans l'URL. Utilisez uniquement des lettres minuscules, des chiffres et des tirets.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description de la bibliothèque..."
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="isOpenSource" checked={isOpenSource} onCheckedChange={setIsOpenSource} />
              <Label htmlFor="isOpenSource">Open Source</Label>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Création en cours..." : "Créer la bibliothèque"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
