'use client'

import React, { useState } from 'react'

interface LanguageImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const LanguageImage: React.FC<LanguageImageProps> = ({ src, alt, width, height, className = '' }) => {
  const [error, setError] = useState(!src)

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-200 border-2 border-black ${className}`}
        style={{ width, height }}
      >
        <span className="text-2xl font-bold">{alt.charAt(0).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
      onError={() => setError(true)}
    />
  )
}

export default LanguageImage