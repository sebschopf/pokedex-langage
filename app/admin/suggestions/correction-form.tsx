"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Language } from "@/types/models/language"

interface CorrectionFormProps {
  languages: Language[]
  onSubmit: (formData: FormData) => Promise<{ success: boolean }>
}

export default function CorrectionForm({ languages, onSubmit }: CorrectionFormProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await onSubmit(formData)

      if (result.success) {
        setMessage({
          text: "Votre correction a été soumise avec succès. Merci pour votre contribution !",
          type: "success",
        })
        // Réinitialiser le formulaire
        formRef.current?.reset()
        setSelectedLanguage("")
      } else {
        setMessage({
          text: "Une erreur est survenue lors de la soumission de votre correction. Veuillez réessayer.",
          type: "error",
        })
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la correction:", error)
      setMessage({
        text: `Une erreur est survenue: ${error instanceof Error ? error.message : "Veuillez réessayer."}`,
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="languageId">Langage concerné</Label>
        <Select
          value={selectedLanguage}
          onValueChange={(value) => setSelectedLanguage(value)}
          name="languageId"
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un langage" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.id} value={language.id.toString()}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="field">Champ concerné (optionnel)</Label>
        <Input id="field" name="field" placeholder="Ex: description, année de création, etc." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correctionText">Correction proposée</Label>
        <Textarea
          id="correctionText"
          name="correctionText"
          placeholder="Décrivez l'erreur que vous avez repérée"
          required
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="suggestion">Suggestion (optionnel)</Label>
        <Textarea
          id="suggestion"
          name="suggestion"
          placeholder="Proposez une correction ou une amélioration"
          rows={4}
        />
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Soumettre la correction"}
      </Button>
    </form>
  )
}
