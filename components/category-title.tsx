import React from 'react'

interface CategoryTitleProps {
  title: string
  className?: string
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title, className = '' }) => {
  return (
    <h4 className={`inline-block text-lg font-bold bg-black text-white px-4 py-2 mb-4 transform -rotate-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      {title}
    </h4>
  )
}

export default CategoryTitle