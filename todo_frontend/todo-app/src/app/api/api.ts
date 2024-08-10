import axios from 'axios';
import { Todo } from '../types/types';

// Create an instance of Axios with default configurations
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Function to set the Authorization token in the Axios headers
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to handle user login
export const login = async (email: string, password: string): Promise<string> => {
  const response = await api.post('/token', new URLSearchParams({ username: email, password }));
  const accessToken = response.data.access_token;
  
  // Store the token in localStorage
  localStorage.setItem('token', accessToken);

  return accessToken;
};

export const signup = async (name: string, email: string, password: string): Promise<string> => {
  const response = await api.post('/signup', {
    user_name: name, 
    user_email: email, 
    user_password: password 
  });
  const accessToken = response.data.access_token;

  // Store the token in localStorage
  localStorage.setItem('token', accessToken);

  return accessToken;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout'); // Replace with the actual endpoint for logging out
};


// Function to fetch todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todos/');
  return response.data;
};

// Function to create a new todo
export const createTodo = async (todo: { content: string }): Promise<Todo> => {
  const response = await api.post('/todos/', todo);
  return response.data;
};

// Function to update an existing todo
export const updateTodo = async (id: number, todo: { content: string }): Promise<Todo> => {
  const response = await api.put(`/todos/${id}/`, todo);
  return response.data;
};

// Function to delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}/`);
};

