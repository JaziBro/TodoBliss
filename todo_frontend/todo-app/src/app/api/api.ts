import axios from 'axios';
import { Todo } from '../types/types';

// Create an instance of Axios with default configurations
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,   
});

// Function to set the Authorization token in the Axios headers
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to handle user login
export const login = async (email: string, password: string): Promise<string> => {
  try {
    console.log('Attempting login with:', { email, password });

    const response = await api.post('/token', new URLSearchParams({
      username: email,
      password: password
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Login response:', response);

    if (response.status !== 200) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const accessToken = response.data.access_token;

    // Store the token in localStorage
    localStorage.setItem('token', accessToken);

    return accessToken;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Login error:', error.message);
    } else {
      console.error('An unknown error occurred!');
    }
    throw error;
  }
};

export const signup = async (name: string, email: string, password: string): Promise<string> => {
  try {
    const response = await api.post('/signup', {
      user_name: name, 
      user_email: email, 
      user_password: password 
    });

    const accessToken = response.data.access_token;

    // Store the token in localStorage
    localStorage.setItem('token', accessToken);

    return accessToken;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Function to log out
export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout'); // Make sure the path '/logout' exists in your backend
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
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
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

// Function to delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}/`);
};
