"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

// Définir le type UserRoleType
type UserRoleType = "admin" | "validator" | "verified" | "registered"

interface UserRoleBadgeProps {
  role: UserRoleType
  className?: string
  editable?: boolean
  onRoleChange?: (newRole: UserRoleType) => void
}

export function UserRoleBadge({ role: initialRole, className, editable = false, onRoleChange }: UserRoleBadgeProps) {
  const [role, setRole] = useState<UserRoleType>(initialRole)

  // Définir les classes Tailwind pour chaque rôle
  const roleClasses: Record<UserRoleType, string> = {
    admin: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    validator: "bg-amber-500 text-white hover:bg-amber-600",
    verified: "bg-green-500 text-white hover:bg-green-600",
    registered: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  }

  // Déterminer la variante de base à utiliser
  const baseVariant = role === "admin" ? "destructive" : "secondary"

  const handleRoleChange = (newRole: UserRoleType) => {
    setRole(newRole)
    if (onRoleChange) {
      onRoleChange(newRole)
    }
  }

  if (!editable) {
    return (
      <Badge
        variant={baseVariant}
        className={cn(role !== "admin" && role !== "registered" ? roleClasses[role] : "", className)}
      >
        {role}
      </Badge>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant={baseVariant}
          className={cn(
            role !== "admin" && role !== "registered" ? roleClasses[role] : "",
            "cursor-pointer flex items-center gap-1",
            className,
          )}
        >
          {role} <ChevronDown className="h-3 w-3" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {Object.keys(roleClasses).map((roleKey) => (
          <DropdownMenuItem
            key={roleKey}
            onClick={() => handleRoleChange(roleKey as UserRoleType)}
            className={cn("font-bold", role === roleKey && "bg-gray-100")}
          >
            {roleKey}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
