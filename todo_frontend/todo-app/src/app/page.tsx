"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTodos, createTodo, setAuthToken, updateTodo, deleteTodo, logout } from './api/api';
import { Todo } from './types/types';
import Image from 'next/image';
import logo from '../../public/logo-01.png';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/signup');
      } else {
        setAuthToken(token);
        setIsLoggedIn(true);
        fetchTodos();
      }
    };

    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    checkAuthentication();
  }, [router]);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const todo = await createTodo({ content: newTodo });
        setTodos([...todos, todo]);
        setNewTodo('');
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    }
  };

  const handleUpdateTodo = async (id: number) => {
    if (editContent.trim() !== '') {
      try {
        await updateTodo(id, { content: editContent });
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, content: editContent } : todo
        ));
        setEditingTodoId(null);
        setEditContent('');
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    router.push('/signup'); // Redirect user to signup page after logout
  };
  

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center p-8">
      <nav className="w-full flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            <Image src={logo} alt='TodoBliss' className='w-[120px] h-[cm]' />
          </Link>
        </div>
        <div className="flex items-center space-x-6 ml-auto">
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {loading ? (
        <div className="text-white text-2xl font-bold">Loading...</div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-white mb-8">Add a Todo!</h1>
          <div className="flex items-center mb-8 w-full max-w-lg">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="p-2 rounded-l-lg border border-gray-300 outline-none flex-grow"
              placeholder="Add a new todo..."
            />
            <button
              onClick={handleAddTodo}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-r-lg shadow-md hover:bg-blue-600"
            >
              Add Todo
            </button>
          </div>
          <ul className="w-full max-w-3xl space-y-4">
            {todos.map((todo, index) => (
              <li key={todo.id} className="mb-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2">
                  <span className="font-semibold">{`Todo ${index + 1}`}</span>
                  <div className="flex items-center justify-between">
                    <span>{todo.content}</span>
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
                  {editingTodoId === todo.id && (
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
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
