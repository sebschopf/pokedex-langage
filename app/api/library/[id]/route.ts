import { NextResponse } from 'next/server';
import { getLibraryById, updateLibrary, deleteLibrary } from '@/lib/server/api/libraries';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const library = await getLibraryById(Number(params.id));

    if (!library) {
      return NextResponse.json({ error: 'Bibliothèque non trouvée' }, { status: 404 });
    }

    return NextResponse.json(library);
  } catch (error) {
    console.error('Erreur lors de la récupération de la bibliothèque:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifier l'authentification et les autorisations
    const supabase = createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier le rôle de l'utilisateur (admin ou éditeur)
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!roleData || !['admin', 'editor'].includes(roleData.role)) {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const data = await request.json();
    const updatedLibrary = await updateLibrary(Number(params.id), data);

    if (!updatedLibrary) {
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la bibliothèque' },
        { status: 500 },
      );
    }

    return NextResponse.json(updatedLibrary);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la bibliothèque:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Vérifier l'authentification et les autorisations
    const supabase = createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier le rôle de l'utilisateur (admin uniquement)
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!roleData || roleData.role !== 'admin') {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
    }

    const success = await deleteLibrary(Number(params.id));

    if (!success) {
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la bibliothèque' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de la bibliothèque:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
