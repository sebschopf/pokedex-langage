"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { hasRole } from "../lib/permissions"
import type { UserRole } from "@/lib/permissions"

interface RoleProtectedProps {
  requiredRole: UserRole
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleProtected({
  requiredRole,
  children,
  fallback = <p>You don't have permission to view this content.</p>,
}: RoleProtectedProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkPermission() {
      try {
        const result = await hasRole(requiredRole)
        setHasPermission(result)
      } catch (error) {
        console.error("Error checking permission:", error)
        setHasPermission(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkPermission()
  }, [requiredRole])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>
}

