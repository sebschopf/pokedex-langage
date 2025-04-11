import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { hasRole } from '@/lib/permissions'

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Vérifier si l'utilisateur est authentifié
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour soumettre une proposition' },
        { status: 401 }
      )
    }
    
    // Vérifier si l'utilisateur a le rôle requis
    const hasRequiredRole = await hasRole('registered')
    
    if (!hasRequiredRole) {
      return NextResponse.json(
        { error: 'Vous n\'avez pas les permissions nécessaires' },
        { status: 403 }
      )
    }
    
    // Récupérer les données de la requête
    const { name, type, description, created_year, creator, used_for, status } = await request.json()
    
    // Valider les données
    if (!name || !type || !description) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }
    
    // Insérer la proposition dans la base de données
    const { data, error } = await supabase
      .from('language_proposals')
      .insert({
        name,
        type,
        description,
        created_year,
        creator,
        used_for,
        status: status || 'pending',
        user_id: session.user.id
      })
      .select()
    
    if (error) {
      console.error('Erreur lors de l\'insertion de la proposition:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de la proposition' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Vérifier si l'utilisateur est authentifié
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour accéder aux propositions' },
        { status: 401 }
      )
    }
    
    // Récupérer les propositions (les politiques RLS s'appliqueront automatiquement)
    const { data, error } = await supabase
      .from('language_proposals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erreur lors de la récupération des propositions:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des propositions' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre demande' },
      { status: 500 }
    )
  }
}
