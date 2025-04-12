// Utilisation d'une exportation nommée (named export)
export const LanguageCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="p-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="mt-2 h-3 w-1/2 bg-gray-300 rounded dark:bg-gray-600"></div>
        <div className="mt-4 flex space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  )
}
