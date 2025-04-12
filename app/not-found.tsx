import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container py-8">
      <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
        <p className="mb-6">Désolé, la page que vous recherchez n'existe pas.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-white border-4 border-black text-black font-black text-lg uppercase hover:bg-yellow-300 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
