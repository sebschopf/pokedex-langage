"use client"

import { ChevronDown } from "lucide-react"
import type { HTMLAttributes } from "react"

interface ToggleExpandButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isExpanded: boolean
  onClick: () => void
}

export default function ToggleExpandButton({ isExpanded, onClick, className, ...props }: ToggleExpandButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute right-0 bottom-0 w-6 h-6 flex items-center justify-center bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all rounded-none ${className}`}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? "Réduire la description" : "Voir la description complète"}
      {...props}
    >
      <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
    </button>
  )
}
