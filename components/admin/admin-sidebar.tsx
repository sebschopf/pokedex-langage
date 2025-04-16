"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/theme"
import { BookOpen, Code, Users, MessageSquare, FileText, Settings, Home, CheckSquare } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"

const adminNavItems = [
  {
    title: "Tableau de bord",
    href: "/admin",
    icon: Home,
    roles: ["admin", "validator"],
  },
  {
    title: "Langages",
    href: "/admin/languages",
    icon: Code,
    roles: ["admin"],
  },
  {
    title: "Frameworks",
    href: "/admin/frameworks",
    icon: BookOpen,
    roles: ["admin"],
  },
  {
    title: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Corrections",
    href: "/admin/corrections",
    icon: CheckSquare,
    roles: ["admin", "validator"],
  },
  {
    title: "Propositions",
    href: "/admin/proposals",
    icon: MessageSquare,
    roles: ["admin", "validator"],
  },
  {
    title: "Contenu",
    href: "/admin/content",
    icon: FileText,
    roles: ["admin"],
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
    roles: ["admin"],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { userRole } = useAuth()

  // Filtrer les éléments de navigation en fonction du rôle de l'utilisateur
  const filteredNavItems = adminNavItems.filter((item) => item.roles.includes(userRole || ""))

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold px-4 py-2">Administration</h2>
      </div>

      <nav className="space-y-1">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-primary text-primary-foreground font-medium"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-200 mt-8">
        <Link href="/" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
          Retour au site
        </Link>
      </div>
    </div>
  )
}
