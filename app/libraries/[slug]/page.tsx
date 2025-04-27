import { notFound } from 'next/navigation';
import { getLibraryBySlug } from '@/lib/server/api/libraries';
import { getLanguageById } from '@/lib/server/api/languages';
import Link from 'next/link';

export default async function LibraryPage({ params }: { params: { slug: string } }) {
  const library = await getLibraryBySlug(params.slug);

  if (!library) {
    notFound();
  }

  // Récupérer les informations du langage associé
  const language = library.languageId ? await getLanguageById(library.languageId) : null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-black mb-8 border-b-4 border-black pb-2">{library.name}</h1>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-8">
        {library.description && <p className="text-gray-800 mb-6 text-lg">{library.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="border-4 border-black p-4 bg-yellow-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Informations</h2>
            <ul className="space-y-3">
              {language && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Langage:</span>
                  <Link
                    href={`/languages/${language.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {language.name}
                  </Link>
                </li>
              )}
              {library.technologyType && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Type:</span>
                  <span className="text-lg">{library.technologyType}</span>
                </li>
              )}
              {library.version && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Version:</span>
                  <span className="text-lg">{library.version}</span>
                </li>
              )}
              {library.isOpenSource !== undefined && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Open Source:</span>
                  <span className="text-lg">{library.isOpenSource ? 'Oui' : 'Non'}</span>
                </li>
              )}
              {library.license && (
                <li className="flex flex-col">
                  <span className="font-bold text-lg">Licence:</span>
                  <span className="text-lg">{library.license}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="border-4 border-black p-4 bg-blue-100 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Utilisations</h2>
            {library.bestFor && <p className="text-lg mb-4">{library.bestFor}</p>}

            {library.features && library.features.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-bold mt-4 mb-2">Fonctionnalités</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {library.features.map((feature, index) => (
                    <li key={index} className="text-lg">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Liens */}
        {(library.websiteUrl || library.githubUrl || library.documentationUrl) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Liens</h2>
            <div className="flex flex-wrap gap-4">
              {library.websiteUrl && (
                <a
                  href={library.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-green-400 text-black font-bold border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Site officiel
                </a>
              )}
              {library.githubUrl && (
                <a
                  href={library.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-purple-400 text-black font-bold border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  GitHub
                </a>
              )}
              {library.documentationUrl && (
                <a
                  href={library.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-400 text-black font-bold border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Documentation
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
