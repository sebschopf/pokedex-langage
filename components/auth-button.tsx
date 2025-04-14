"use client"

import { useRouter } from "next/navigation"
import { Loader2, LogOut, User, LayoutDashboard } from 'lucide-react'
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/providers/auth-provider"

export function AuthButton() {
  const { user, userRole, avatarUrl, isLoading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="px-6 py-3 bg-gray-200 border-4 border-black text-black font-black text-lg uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span>Chargement</span>
      </div>
    )
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative h-12 w-12 rounded-none border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:-translate-y-1 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl || "/placeholder.svg"} alt={user.email || ""} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-blue-300 font-black text-xl">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none p-0 min-w-[200px]"
        >
          <div className="flex items-center justify-start gap-2 p-3 border-b-4 border-black bg-yellow-100">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-bold">{user.email}</p>
              <p className="text-sm font-medium">{userRole || "Utilisateur"}</p>
            </div>
          </div>

          <div className="p-1">
            <Link href="/profile" className="flex items-center w-full p-2 hover:bg-yellow-300 transition-colors">
              <User className="mr-2 h-4 w-4" />
              <span className="font-bold">Profil</span>
            </Link>

            {/* Afficher le lien vers le tableau de bord admin uniquement pour les admins et validators */}
            {(userRole === "admin" || userRole === "validator") && (
              <Link
                href="/admin/dashboard"
                className="flex items-center w-full p-2 hover:bg-yellow-300 transition-colors"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span className="font-bold">Admin Dashboard</span>
              </Link>
            )}
          </div>

          <div className="border-t-4 border-black p-1">
            <button onClick={handleSignOut} className="flex items-center w-full p-2 hover:bg-red-300 transition-colors">
              <LogOut className="mr-2 h-4 w-4" />
              <span className="font-bold">Se déconnecter</span>
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Link
      href="/login"
      className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
    >
      Connexion
    </Link>
  )
}