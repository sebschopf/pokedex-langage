'use client';

import type React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ToggleExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

const ToggleExpandButton: React.FC<ToggleExpandButtonProps> = ({
  isExpanded,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute right-0 top-0 p-1 bg-white border-2 border-black hover:bg-gray-100 transition-colors ${className}`}
      aria-label={isExpanded ? 'Réduire le texte' : 'Voir plus de texte'}
      aria-expanded={isExpanded}
    >
      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
};

export default ToggleExpandButton;
