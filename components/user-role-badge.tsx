import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { UserRoleType } from "@/types/user-role"

interface UserRoleBadgeProps {
  role: UserRoleType
  className?: string
}

export function UserRoleBadge({ role, className }: UserRoleBadgeProps) {
  // Définir les classes Tailwind pour chaque rôle
  const roleClasses: Record<UserRoleType, string> = {
    admin: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    validator: "bg-amber-500 text-white hover:bg-amber-600",
    verified: "bg-green-500 text-white hover:bg-green-600",
    registered: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    anonymous: "bg-gray-300 text-gray-700 hover:bg-gray-400",
  }

  // Déterminer la variante de base à utiliser
  const baseVariant = role === "admin" ? "destructive" : "secondary"

  return (
    <Badge
      variant={baseVariant}
      // Utiliser cn pour combiner les classes de base avec les classes spécifiques au rôle
      className={cn(role !== "admin" && role !== "registered" ? roleClasses[role] : "", className)}
    >
      {role}
    </Badge>
  )
}

