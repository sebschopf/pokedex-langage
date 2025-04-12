"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/client/supabase"

const formSchema = z.object({
  language: z.string().min(2, {
    message: "Language must be at least 2 characters.",
  }),
})

export function LanguageSuggestionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientSupabaseClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Non authentifié",
          description: "Vous devez être connecté pour suggérer une langue.",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase.from("language_suggestions").insert({
        language: values.language,
        user_id: user.id,
      })

      if (error) {
        console.error("Erreur lors de la suggestion de la langue:", error)
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suggestion de la langue.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Succès",
          description: "Votre suggestion a été soumise avec succès!",
        })
        form.reset()
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error)
      toast({
        title: "Erreur",
        description: "Impossible de vérifier votre statut d'authentification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Input placeholder="Language to suggest" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
