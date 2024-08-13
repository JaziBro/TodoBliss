"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTodoById } from '../../api/api'; // Adjust the import path according to your project structure
import { Todo } from '../../types/types';

export default function TodoPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todoData = await getTodoById(parseInt(params.id));
        setTodo(todoData);
      } catch (error) {
        console.error('Error fetching todo:', error);
        router.push('/'); // Redirect to home if the todo is not found
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h1>{todo.content}</h1>
      {/* You can add more details or functionality for the todo here */}
    </div>
  );
}
