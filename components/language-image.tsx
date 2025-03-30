"use client"

import { useState } from "react"
import Image from "next/image"

interface LanguageImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function LanguageImage({ src, alt, width, height, className }: LanguageImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className || ""}`} style={{ width, height }}>
        <span className="text-2xl font-bold">{alt.charAt(0)}</span>
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
}

