import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    const response = await axios.get('https://todo-backend-1-0lng.onrender.com/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;

    const response = await axios.post(
      'https://todo-backend-1-0lng.onrender.com/todos',
      { content: newTodo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const response = await axios.put(
      `https://todo-backend-1-0lng.onrender.com/todos/${id}`,
      { ...todo, completed: !todo.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTodos(todos.map((t) => (t.id === id ? response.data : t)));
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`https://todo-backend-1-0lng.onrender.com/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <button onClick={logout} className="mb-4 p-2 bg-red-500 text-white rounded">
        Logout
      </button>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border-b">
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.content}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;