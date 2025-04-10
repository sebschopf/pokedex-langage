export default function DebugPage() {
    return (
      <div className="p-8 bg-white border-4 border-black m-8">
        <h1 className="text-2xl font-bold mb-4">Page de diagnostic</h1>
        <p>Si vous voyez cette page, le routage fonctionne correctement.</p>
  
        <div className="mt-4 space-y-2">
          <h2 className="text-xl font-bold">Liens de test:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a href="/" className="text-blue-600 underline">
                Page d'accueil (/)
              </a>
            </li>
            <li>
              <a href="/login" className="text-blue-600 underline">
                Page de login (/login)
              </a>
            </li>
            <li>
              <a href="/admin/dashboard" className="text-blue-600 underline">
                Dashboard admin (/admin/dashboard)
              </a>
            </li>
            <li>
              <a href="/profile" className="text-blue-600 underline">
                Profil utilisateur (/profile)
              </a>
            </li>
          </ul>
        </div>
  
        <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded">
          <h2 className="text-lg font-bold">Instructions de débogage:</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Ouvrez la console du navigateur (F12) pour voir les logs du middleware</li>
            <li>Cliquez sur les liens ci-dessus pour tester les redirections</li>
            <li>Vérifiez que vous êtes bien redirigé vers la page de login si vous n'êtes pas connecté</li>
            <li>Vérifiez que vous pouvez accéder au dashboard admin si vous avez les permissions</li>
          </ol>
        </div>
      </div>
    )
  }
  