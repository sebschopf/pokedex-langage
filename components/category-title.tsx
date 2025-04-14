import type React from "react"
import { cn } from "@/utils/theme"

interface CategoryTitleProps {
  title: string
  count?: number
  subtitle?: string
  className?: string
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title, count, subtitle, className = "" }) => {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-2xl font-bold border-b-4 border-black dark:border-[#3a3a30] pb-2 flex justify-between items-baseline">
        {title}
        {count !== undefined && <span className="text-lg font-medium">{count}</span>}
      </h2>
      {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>}
    </div>
  )
}

export default CategoryTitle
