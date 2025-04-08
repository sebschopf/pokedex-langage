import React from 'react'

interface SubtypeBadgeProps {
  subtype: string
  className?: string
}

const SubtypeBadge: React.FC<SubtypeBadgeProps> = ({ subtype, className = '' }) => {
  return (
    <div className={`inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 border-2 border-black transform -rotate-1 ${className}`}>
      {subtype}
    </div>
  )
}

export default SubtypeBadge