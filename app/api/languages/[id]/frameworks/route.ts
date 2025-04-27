import { NextResponse } from 'next/server';
import { getLibrariesByLanguageId } from '@/lib/server/api/libraries';
import { getLanguageById } from '@/lib/server/api/languages';

// Forcer le rendu dynamique de cette route
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id);

    // Vérifier que l'ID est un nombre valide
    if (isNaN(id)) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    // Vérifier que le langage existe
    const language = await getLanguageById(id);
    if (!language) {
      return NextResponse.json({ error: 'Langage non trouvé' }, { status: 404 });
    }

    // Récupérer les frameworks associés au langage
    const frameworks = await getLibrariesByLanguageId(id);

    return NextResponse.json(frameworks);
  } catch (error) {
    console.error('Erreur lors de la récupération des frameworks:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des frameworks' },
      { status: 500 },
    );
  }
}
