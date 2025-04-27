import { type NextRequest, NextResponse } from 'next/server';
import { createCorrection } from '@/lib/server/api/corrections';
import { createServerClient } from '@/lib/supabase/server';
import type { Correction } from '@/types/models/correction';

// GET /api/corrections
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('corrections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Erreur lors de la récupération des corrections:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/corrections
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Vérifier les champs requis
    if (!body.language_id || !body.correction_text) {
      return NextResponse.json(
        { error: 'Les champs language_id et correction_text sont requis' },
        { status: 400 },
      );
    }

    // Créer un objet correction avec les champs requis
    const correctionData: Omit<Correction, 'id'> = {
      languageId: body.language_id,
      correctionText: body.correction_text,
      suggestion: body.suggestion || null,
      field: body.field || null,
      framework: body.framework || null,
      status: body.status || 'pending',
      userId: body.user_id || null,
      createdAt: null,
      updatedAt: null,
    };

    // Créer la correction
    const correction = await createCorrection(correctionData);

    return NextResponse.json({ data: correction }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la correction:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
