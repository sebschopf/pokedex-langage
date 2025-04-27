import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Accès non autorisé</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Se connecter avec un autre compte</Link>
        </Button>
      </div>
    </div>
  );
}
