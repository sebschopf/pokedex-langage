// app/actions/todo-actions.ts
'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Todo } from '@/types/models';
import { todoToDb } from '@/lib/server/mapping';

export async function createOrUpdateTodo(todoData: Partial<Todo>): Promise<void> {
  const cookieStore = cookies();
  const supabase = createServerActionClient({ cookies: () => cookieStore });
  
  // Vérifier l'authentification
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  
  try {
    const now = new Date().toISOString();
    
    // Utiliser votre fonction de mapping existante
    const dbTodoData = todoToDb(todoData);
    
    // Déterminer s'il s'agit d'une création ou d'une mise à jour
    if (todoData.id) {
      // Mise à jour d'une tâche existante
      const { error } = await supabase
        .from('todos')
        .update({
          ...dbTodoData,
          updated_at: now
        })
        .eq('id', todoData.id)
        .eq('user_id', session.user.id);
      
      if (error) throw error;
    } else {
      // Création d'une nouvelle tâche
      const { error } = await supabase
        .from('todos')
        .insert({
          ...dbTodoData,
          user_id: session.user.id,
          is_completed: todoData.isCompleted ?? false,
          created_at: now,
          updated_at: null
        });
      
      if (error) throw error;
    }
    
    // Ne retourne rien (void) au lieu d'un objet de résultat
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la tâche:', error);
    // Lancer l'erreur pour qu'elle soit gérée par le composant TodoForm
    throw error;
  }
}