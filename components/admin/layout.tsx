"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileEdit,
  Users,
  LogOut,
  ChevronRight,
  User,
  Settings,
  Database,
  ImageIcon,
} from "lucide-react"
import { createClientSupabaseClient } from "@/lib/client/supabase"
import { withTokenRefresh } from "@/lib/client/auth-helpers"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
  userRole: string
}

export function AdminLayout({ children, userRole }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient()
  const [userProfile, setUserProfile] = useState<{ avatar_url?: string; email?: string } | null>(null)

  useEffect(() => {
    async function loadUserProfile() {
      try {
        await withTokenRefresh(async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user) {
            const { data: profile } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single()

            setUserProfile({
              avatar_url: profile?.avatar_url || undefined,
              email: user.email,
            })
          }
        })
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error)
      }
    }

    loadUserProfile()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
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
    {
      label: "Gestion des médias",
      href: "/admin/storage",
      icon: <ImageIcon className="h-5 w-5 mr-2" />,
      active: pathname === "/admin/storage",
    },
    {
      label: "Gestion des langages",
      href: "/admin/languages",
      icon: <Database className="h-5 w-5 mr-2" />,
      active: pathname.includes("/admin/languages"),
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
          <div className="flex items-center justify-between">
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
                        : pathname.includes("/admin/storage")
                          ? "Médias"
                          : pathname.includes("/admin/languages")
                            ? "Langages"
                            : ""}
                  </span>
                </>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile?.avatar_url || "/placeholder.svg"} alt="Avatar" />
                    <AvatarFallback>{userProfile?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userRole === "admin" ? "Administrateur" : "Validateur"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mon profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
