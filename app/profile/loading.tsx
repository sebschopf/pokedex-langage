//profile/page.tsx
export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="px-8 py-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center">
          <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="font-bold text-xl">Chargement...</span>
        </div>
      </div>
    )
  }
  
  