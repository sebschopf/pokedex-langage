import { NextResponse } from 'next/server';
import { getLanguageBySlug } from '@/lib/server/api/languages';

// Forcer le rendu dynamique de cette route
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    // Vérifier que le slug est présent
    if (!params.slug) {
      return NextResponse.json({ error: 'Slug du langage manquant' }, { status: 400 });
    }

    const language = await getLanguageBySlug(params.slug);

    if (!language) {
      return NextResponse.json({ error: 'Langage non trouvé' }, { status: 404 });
    }

    return NextResponse.json(language);
  } catch (error) {
    console.error('Erreur lors de la récupération du langage:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du langage' },
      { status: 500 },
    );
  }
}
