// app/todos/edit/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { TodoForm } from '@/components/todo-form';
import { createOrUpdateTodo } from '@/app/actions/todo-actions';
import { dbToTodo, dbToTodoCategory, dbToTodoStatus } from '@/lib/server/mapping';

export const dynamic = 'force-dynamic';

interface EditTodoPageProps {
  params: {
    id: string;
  };
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const todoId = parseInt(params.id, 10);
  
  if (isNaN(todoId)) {
    notFound();
  }

  // Vérifier si l'utilisateur est connecté
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Récupérer la tâche, les catégories et les statuts
  const { data: todoData } = await supabase
    .from('todos')
    .select('*')
    .eq('id', todoId)
    .eq('user_id', session.user.id)
    .single();

  if (!todoData) {
    notFound();
  }

  const { data: categoriesData } = await supabase
    .from('todo_categories')
    .select('*')
    .order('name');

  const { data: statusesData } = await supabase
    .from('todo_status')
    .select('*')
    .order('id');

  // Transformer les données
  const todo = dbToTodo(todoData);
  const categories = (categoriesData || []).map(dbToTodoCategory);
  const statuses = (statusesData || []).map(dbToTodoStatus);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Modifier la tâche</h1>
      <div className="max-w-2xl mx-auto">
        <TodoForm
          todo={todo}
          categories={categories}
          statuses={statuses}
          onSubmit={createOrUpdateTodo}
        />
      </div>
    </div>
  );
}