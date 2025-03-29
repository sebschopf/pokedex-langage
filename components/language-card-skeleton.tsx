export default function LanguageCardSkeleton() {
  return (
    <div className="min-h-[420px] h-[420px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-6 pb-8 flex flex-col h-full justify-between">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div className="inline-block w-24 h-8 bg-gray-300 animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-300 animate-pulse"></div>
          </div>
          <div className="h-10 w-3/4 bg-gray-300 mt-2 animate-pulse"></div>
        </div>

        <div className="flex justify-center items-center my-4 flex-1">
          <div className="w-32 h-32 bg-gray-300 animate-pulse"></div>
        </div>

        <div className="h-16 bg-gray-300 mb-3 animate-pulse"></div>

        <div className="mt-auto">
          <div className="mb-2 h-6 w-40 bg-gray-300 animate-pulse"></div>
          <div className="w-full bg-gray-300 h-6 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

