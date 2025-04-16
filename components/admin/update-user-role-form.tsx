"use client"
import type { UserRoleType } from "@/lib/client/permissions"
import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/client/supabase"
import { useToast } from "@/components/ui/use-toast"

interface UpdateUserRoleFormProps {
  userId: string
  currentRole: string
}

export function UpdateUserRoleForm({ userId, currentRole }: UpdateUserRoleFormProps) {
  const [role, setRole] = useState<UserRoleType>(currentRole as UserRoleType)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createBrowserClient()

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRoleType)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filtrer le rôle "anonymous" qui n'est pas stockable en base de données
      const dbRole = role === "anonymous" ? "registered" : role
      await supabase.from("user_roles").update({ role: dbRole }).eq("user_id", userId)

      toast({
        title: "Role updated",
        description: "The user role has been updated successfully.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.message,
      })
    } finally {
      setIsSubmitting(false)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={role}
          onChange={handleRoleChange}
          disabled={isSubmitting}
        >
          <option value="anonymous">Anonymous</option>
          <option value="registered">Registered</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Role"}
        </button>
      </div>
    </form>
  )
}
