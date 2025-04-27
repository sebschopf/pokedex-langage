import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { dbToLanguageProposal } from '@/lib/server/mapping/language-proposal-mapping';

export async function GET(request: Request) {
  try {
    const supabase = createServerClient();
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'pending';

    let query = supabase.from('language_proposals').select('*');

    query = query.eq('status', status);

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data ? data.map(dbToLanguageProposal) : []);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des propositions:', error);
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération des propositions' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    // Vérifier que les champs obligatoires sont présents
    if (!body.name) {
      return NextResponse.json({ message: 'Le nom est obligatoire' }, { status: 400 });
    }

    // S'assurer que les champs obligatoires sont présents
    const insertData = {
      name: body.name, // Champ obligatoire
      status: body.status || 'pending',
      user_id: body.user_id || '', // Assurez-vous que user_id est défini
      created_at: body.created_at || new Date().toISOString(),
      // Ajouter d'autres champs optionnels
      description: body.description,
      type: body.type,
      updated_at: body.updated_at,
      created_year: body.created_year,
      creator: body.creator,
      popular_frameworks: body.popular_frameworks,
      strengths: body.strengths,
      used_for: body.used_for,
    };

    const { data, error } = await supabase
      .from('language_proposals')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Erreur lors de la création de la proposition:', error);
      return NextResponse.json(
        { message: 'Erreur lors de la création de la proposition' },
        { status: 500 },
      );
    }

    return NextResponse.json(dbToLanguageProposal(data), { status: 201 });
  } catch (error: any) {
    console.error('Erreur lors de la création de la proposition:', error);
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la création de la proposition' },
      { status: 500 },
    );
  }
}
