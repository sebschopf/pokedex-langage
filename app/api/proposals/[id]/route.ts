import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { dbToLanguageProposal } from '@/lib/server/mapping/language-proposal-mapping';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('language_proposals')
      .select('*')
      .eq('id', Number.parseInt(params.id))
      .single();

    if (error) {
      return NextResponse.json({ message: 'Proposition non trouvée' }, { status: 404 });
    }

    return NextResponse.json(dbToLanguageProposal(data));
  } catch (error: any) {
    console.error(`Erreur lors de la récupération de la proposition ${params.id}:`, error);
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la récupération de la proposition' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    // Mettre à jour la proposition
    const { data, error } = await supabase
      .from('language_proposals')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', Number.parseInt(params.id))
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: 'Erreur lors de la mise à jour de la proposition' },
        { status: 500 },
      );
    }

    return NextResponse.json(dbToLanguageProposal(data));
  } catch (error: any) {
    console.error(`Erreur lors de la mise à jour de la proposition ${params.id}:`, error);
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la mise à jour de la proposition' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('language_proposals')
      .delete()
      .eq('id', Number.parseInt(params.id));

    if (error) {
      return NextResponse.json(
        { message: 'Erreur lors de la suppression de la proposition' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Erreur lors de la suppression de la proposition ${params.id}:`, error);
    return NextResponse.json(
      { message: error.message || 'Erreur lors de la suppression de la proposition' },
      { status: 500 },
    );
  }
}
