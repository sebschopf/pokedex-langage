"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useSupabaseMutation } from "@/hooks/use-supabase-mutation"
import { Loader2 } from "lucide-react"
// Mettre à jour l'import pour utiliser le nouveau chemin
import { generateLanguageSlug, isValidSlug } from "@/utils/slug"

interface Language {
  id: string
  name: string
  slug: string
  year_created?: number | null
  creator?: string | null
  short_description?: string | null
  description?: string | null
  type?: string | null
  used_for?: string | null
  is_open_source?: boolean | null
  logo_path?: string | null
  [key: string]: any
}

interface LanguageFormProps {
  language?: Language
  isNew?: boolean
}

export function LanguageForm({ language, isNew = false }: LanguageFormProps) {
  const [formData, setFormData] = useState<Language>(
    language || {
      id: "",
      name: "",
      slug: "",
      year_created: null,
      creator: "",
      short_description: "",
      description: "",
      type: "",
      used_for: "",
      is_open_source: false,
      logo_path: null,
    },
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugError, setSlugError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { insert, update } = useSupabaseMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Réinitialiser l'erreur de slug si l'utilisateur modifie le slug manuellement
    if (name === "slug") {
      setSlugError(null)
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value ? Number.parseInt(value) : null }))
  }

  const generateSlug = () => {
    if (!formData.name) {
      setSlugError("Le nom du langage est requis pour générer un slug")
      return
    }

    const slug = generateLanguageSlug(formData.name)

    if (!isValidSlug(slug)) {
      setSlugError("Le slug généré n'est pas valide. Veuillez le modifier manuellement.")
      return
    }

    setFormData((prev) => ({ ...prev, slug }))
    setSlugError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validation du slug
      if (!formData.slug) {
        setSlugError("Le slug est requis")
        return
      }

      if (!isValidSlug(formData.slug)) {
        setSlugError(
          "Le slug n'est pas valide. Il ne doit contenir que des lettres minuscules, des chiffres et des tirets.",
        )
        return
      }

      setIsSubmitting(true)

      if (isNew) {
        // Créer un nouveau langage
        await insert({
          table: "languages",
          data: formData,
          successMessage: "Le langage a été créé avec succès.",
          errorMessage: "Erreur lors de la création du langage.",
          onSuccess: () => {
            router.push("/admin/languages")
          },
        })
      } else {
        // Mettre à jour un langage existant
        await update({
          table: "languages",
          data: formData,
          match: { id: formData.id },
          successMessage: "Le langage a été mis à jour avec succès.",
          errorMessage: "Erreur lors de la mise à jour du langage.",
          onSuccess: () => {
            router.refresh()
          },
        })
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nom du langage *
          </label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug *
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className={slugError ? "border-red-500" : ""}
              />
              {slugError && <p className="text-red-500 text-sm mt-1">{slugError}</p>}
            </div>
            <Button type="button" variant="outline" onClick={generateSlug} disabled={!formData.name}>
              Générer
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Le slug est utilisé dans l'URL. Pour C#, utilisez "csharp", pour C++, utilisez "cpp", etc.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="year_created" className="text-sm font-medium">
            Année de création
          </label>
          <Input
            id="year_created"
            name="year_created"
            type="number"
            value={formData.year_created || ""}
            onChange={handleNumberChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="creator" className="text-sm font-medium">
            Créateur
          </label>
          <Input id="creator" name="creator" value={formData.creator || ""} onChange={handleChange} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="short_description" className="text-sm font-medium">
          Description courte
        </label>
        <Input
          id="short_description"
          name="short_description"
          value={formData.short_description || ""}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description complète
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={6}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Type de langage
          </label>
          <Input id="type" name="type" value={formData.type || ""} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <label htmlFor="used_for" className="text-sm font-medium">
            Utilisations principales
          </label>
          <Input id="used_for" name="used_for" value={formData.used_for || ""} onChange={handleChange} />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_open_source"
          checked={formData.is_open_source || false}
          onCheckedChange={(checked) => handleCheckboxChange("is_open_source", checked as boolean)}
        />
        <label
          htmlFor="is_open_source"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Open Source
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isNew ? "Création..." : "Mise à jour..."}
          </>
        ) : isNew ? (
          "Créer le langage"
        ) : (
          "Mettre à jour le langage"
        )}
      </Button>
    </form>
  )
}
