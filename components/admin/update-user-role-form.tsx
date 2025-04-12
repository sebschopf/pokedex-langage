"use client"

import type React from "react"
import type { UserRoleType } from "@/lib/client/permissions"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface UpdateUserRoleFormProps {
  userId: string
  currentRole: string
}

export function UpdateUserRoleForm({ userId, currentRole }: UpdateUserRoleFormProps) {
  const [role, setRole] = useState<UserRoleType>(currentRole as UserRoleType)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (role === currentRole) {
      toast({
        title: "Aucun changement",
        description: "Le rôle sélectionné est identique au rôle actuel.",
      })
      return
    }

    try {
      setIsSubmitting(true)

      await withTokenRefresh(async () => {
        const { error } = await supabase.from("user_roles").update({ role }).eq("id", userId)

        if (error) throw error

        toast({
          title: "Rôle mis à jour",
          description: `Le rôle de l'utilisateur a été mis à jour avec succès.`,
        })

        router.refresh()
      })
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
      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium">
          Nouveau rôle
        </label>
        <Select value={role} onValueChange={(value) => setRole(value as UserRoleType)} disabled={isSubmitting}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="validator">Validateur</SelectItem>
            <SelectItem value="verified">Vérifié</SelectItem>
            <SelectItem value="registered">Enregistré</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting || role === currentRole}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Mise à jour...
          </>
        ) : (
          "Mettre à jour le rôle"
        )}
      </Button>
    </form>
  )
}
