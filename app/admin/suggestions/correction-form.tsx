"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import type { Language } from "@/types/language"

interface CorrectionFormProps {
  languages: Language[]
}

export function CorrectionForm({ languages }: CorrectionFormProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")
  const [field, setField] = useState<string>("usedFor")
  const [correctionText, setCorrectionText] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!selectedLanguage || !field || !correctionText) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/corrections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: selectedLanguage,
          field,
          correction_text: correctionText,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la soumission")
      }

      toast({
        title: "Correction soumise",
        description: "Votre suggestion a été soumise avec succès et sera examinée par notre équipe.",
      })

      // Réinitialiser le formulaire
      setSelectedLanguage("")
      setField("")
      setCorrectionText("")

      // Rafraîchir la page
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre correction.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="language">Langage</Label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Sélectionnez un langage" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={String(language.id)} value={String(language.id)}>
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="field">Champ à corriger</Label>
        <Select value={field} onValueChange={setField}>
          <SelectTrigger id="field">
            <SelectValue placeholder="Sélectionnez un champ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usedFor">Utilisé pour</SelectItem>
            <SelectItem value="shortDescription">Description courte</SelectItem>
            <SelectItem value="popularFrameworks">Frameworks populaires</SelectItem>
            <SelectItem value="strengths">Forces</SelectItem>
            <SelectItem value="usageRate">Taux d'utilisation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="correction">Votre correction</Label>
        <Textarea
          id="correction"
          value={correctionText}
          onChange={(e) => setCorrectionText(e.target.value)}
          placeholder="Décrivez votre correction ici..."
          rows={5}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Soumission en cours..." : "Soumettre la correction"}
      </Button>
    </form>
  )
}

