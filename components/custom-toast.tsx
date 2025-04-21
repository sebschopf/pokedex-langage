"use client"

import { toast as baseToast } from "@/hooks"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "info"

interface CustomToastOptions {
  title: string
  description: string
  type: ToastType
  duration?: number
}

// Composant pour le contenu du toast
const ToastContent = ({ description, type }: { description: string; type: ToastType }) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  return (
    <div className="flex items-center gap-2">
      {icons[type]}
      <span>{description}</span>
    </div>
  )
}

// Fonction pour afficher un toast personnalisé
export function customToast({ title, description, type, duration = 5000 }: CustomToastOptions) {
  // Utiliser uniquement les variants disponibles: "default" ou "destructive"
  const variant = type === "error" ? "destructive" : "default"

  return baseToast({
    title,
    description: <ToastContent description={description} type={type} />,
    variant,
    duration,
  })
}
