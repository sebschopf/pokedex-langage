import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoList } from '@/components/todo-list';
import { SeedTodosButton } from '@/components/seed-todos-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TodosPage() {
  // Vérifier si l'utilisateur est connecté
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Récupérer les catégories et les statuts
  const { data: categories } = await supabase.from('todo_categories').select('*').order('name');

  const { data: statuses } = await supabase.from('todo_status').select('*').order('id');

  // Récupérer les tâches de l'utilisateur
  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  const hasTodos = todos && todos.length > 0;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes tâches</h1>
        <div className="flex gap-4">
          {!hasTodos && <SeedTodosButton />}
          <Button asChild>
            <Link href="/todos/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle tâche
            </Link>
          </Button>
        </div>
      </div>

      <TodoList
        initialTodos={todos || []}
        categories={categories || []}
        statuses={statuses || []}
      />
    </div>
  );
}
