import type React from "react"

interface CategoryTitleProps {
  title: string
  className?: string
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title, className = "" }) => {
  return <h2 className={`text-2xl font-bold border-b-4 border-black pb-2 ${className}`}>{title}</h2>
}

export default CategoryTitle
