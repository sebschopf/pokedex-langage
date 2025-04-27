'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LanguageImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function LanguageImage({ src, alt, width, height, className }: LanguageImageProps) {
  const [error, setError] = useState(false);

  // Image de secours en cas d'erreur
  const fallbackSrc = '/images/placeholder-language.svg';

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
