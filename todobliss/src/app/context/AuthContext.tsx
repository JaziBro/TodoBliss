"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, {AxiosError} from 'axios';

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);



const login = async (username: string, password: string) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('https://todo-backend-1-0lng.onrender.com/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    setToken(access_token);
    setUser(username);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', username);
  } catch (error) {
    // Type guard to check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed. Please check your username and password.');
    } else if (error instanceof Error) {
      // Handle generic errors
      console.error('Login error:', error.message);
      throw new Error('Login failed. Please check your username and password.');
    } else {
      // Handle unknown errors
      console.error('Login error:', 'An unknown error occurred');
      throw new Error('Login failed. Please check your username and password.');
    }
  }
};
     

  const register = async (username: string, email: string, password: string) => {
    const response = await axios.post('https://todo-backend-1-0lng.onrender.com/register', {
      username,
      email,
      password,
    });
    const { access_token } = response.data;
    setToken(access_token);
    setUser(username);
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};