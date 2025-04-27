'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import TodoForm from '@/components/todo-form';
import { createServerClient } from '@/lib/supabase/server';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditTodoPage({ params }: PageProps) {
  const todoId = Number.parseInt(params.id);

  if (isNaN(todoId)) {
    notFound();
  }

  // Récupérer le todo depuis la base de données
  const supabase = createServerClient();
  const { data: todo, error } = await supabase.from('todos').select('*').eq('id', todoId).single();

  if (error || !todo) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Modifier la tâche</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <TodoForm todo={todo} onSubmit={() => {}} />
      </Suspense>
    </div>
  );
}
