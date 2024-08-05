"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTodos, updateTodo } from '../../api/api';
import { Todo } from '../../types/types';

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      if (typeof id === 'string') {
        const todo = await getTodos(Number(id));
        setTodo(todo);
        setUpdatedContent(todo.content);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdateTodo = async () => {
    if (typeof id === 'string') {
      const updatedTodo = await updateTodo(Number(id), { content: updatedContent });
      setTodo(updatedTodo);
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todo Detail</h1>
      <input
        type="text"
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
      />
      <button onClick={handleUpdateTodo}>Update Todo</button>
      <p>{todo.content}</p>
    </div>
  );
}