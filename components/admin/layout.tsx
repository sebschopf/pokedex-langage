"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileEdit, Users, LogOut, ChevronRight } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
  userRole: string
}

export function AdminLayout({ children, userRole }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const navItems = [
    {
      label: "Tableau de bord",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
      active: pathname === "/admin/dashboard",
    },
    {
      label: "Suggestions",
      href: "/admin/suggestions",
      icon: <FileEdit className="h-5 w-5 mr-2" />,
      active: pathname === "/admin/suggestions",
    },
    {
      label: "Utilisateurs",
      href: "/admin/users",
      icon: <Users className="h-5 w-5 mr-2" />,
      active: pathname === "/admin/users",
      disabled: userRole !== "admin",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">
            POKEDEX<span className="text-red-600">_DEV</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Administration</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
              disabled={item.disabled}
            >
              <Link href={item.disabled ? "#" : item.href}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:text-red-400 mt-8"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </Button>
        </nav>
      </div>

      <div className="flex-1">
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/admin/dashboard" className="hover:text-gray-900 dark:hover:text-gray-100">
              Administration
            </Link>
            {pathname !== "/admin/dashboard" && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-gray-900 dark:text-gray-100">
                  {pathname.includes("/admin/suggestions")
                    ? "Suggestions"
                    : pathname.includes("/admin/users")
                      ? "Utilisateurs"
                      : ""}
                </span>
              </>
            )}
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

