"use client";
import { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from './api/api';
import Link from 'next/link';
import { Todo } from './types/types';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      const todo = await createTodo({ content: newTodo });
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = async (id: number) => {
    if (editContent.trim() !== '') {
      const updatedTodo = await updateTodo(id, { content: editContent });
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setEditingTodoId(null);
      setEditContent('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">TodoBliss</h1>
      <div className="flex items-center mb-8">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="p-2 rounded-l-lg border border-gray-300 outline-none"
          placeholder="Add a new todo..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white font-bold py-2 px-4 sm:py-4 sm:px-4 md:py-2 md:px-6 lg:py-2 lg:px-4 rounded-r-lg shadow-md hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Add Todo
        </button>
      </div>
      <ul className="w-full max-w-3xl space-y-4">
        {todos.map((todo, index) => (
          <li key={todo.id} className="mb-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
              <span className="font-semibold">{`Todo ${index + 1}`}</span>
              {editingTodoId === todo.id ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleUpdateTodo(todo.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link href={`/todo/${todo.id}`} className="text-blue-600 hover:underline">
                    {todo.content}
                  </Link>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingTodoId(todo.id)}
                      className="bg-purple-600 text-white hover:bg-purple-800 px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-500 text-white hover:bg-red-700 px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
