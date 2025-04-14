// app/todos/new/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TodoForm } from '@/components/todo-form';
import { createOrUpdateTodo } from '@/app/actions/todo-actions';
import { dbToTodoCategory, dbToTodoStatus } from '@/lib/server/mapping';

export const dynamic = 'force-dynamic';

export default async function NewTodoPage() {
  // Vérifier si l'utilisateur est connecté
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Récupérer les catégories et les statuts
  const { data: categoriesData } = await supabase
    .from('todo_categories')
    .select('*')
    .order('name');

  const { data: statusesData } = await supabase
    .from('todo_status')
    .select('*')
    .order('id');

  // Utiliser vos fonctions de mapping existantes
  const categories = (categoriesData || []).map(dbToTodoCategory);
  const statuses = (statusesData || []).map(dbToTodoStatus);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Nouvelle tâche</h1>
      <div className="max-w-2xl mx-auto">
        <TodoForm
          categories={categories}
          statuses={statuses}
          onSubmit={createOrUpdateTodo}
        />
      </div>
    </div>
  );
}