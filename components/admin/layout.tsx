import { RoleProtected } from "@/components/auth/role-protected"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleProtected
      requiredRole="admin"
      redirectTo="/unauthorized"
      fallback={
        <div className="container py-8">
          <h1 className="text-2xl font-bold">Chargement...</h1>
        </div>
      }
    >
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </RoleProtected>
  )
}
