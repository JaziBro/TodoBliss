import axios from 'axios';
import { Todo } from '../types/types';

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get('/todos/');
  return response.data;
};

export const createTodo = async (todo: { content: string }): Promise<Todo> => {
  const response = await api.post('/todos/', { ...todo, done: false });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}/`);
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const response = await api.put(`/todos/${id}/`, updates);
  return response.data;
};
