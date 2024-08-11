"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from '../api/api';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For signup mode
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear any previous errors
  
    try {
      let token: string;
      if (mode === 'login') {
        token = await login(email, password);
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        token = await signup(name, email, password);
        localStorage.setItem('token', token);
        router.push('/login');
      }
    } catch (err: any) {
      console.error('Signup/Login error:', err.response?.data);
      
      // Improved error handling based on response structure
      if (err.response?.data?.detail) {
        const errorResponse = err.response.data.detail;
  
        if (Array.isArray(errorResponse)) {
          setError(errorResponse.map((errObj: any) => errObj.msg).join(', '));
        } else if (typeof errorResponse === 'string') {
          setError(errorResponse);
        } else {
          setError('Authentication failed. Please check your credentials and try again.');
        }
      } else {
        // Log the entire error object for debugging
        console.error('Full error object:', err);
        console.log('Login API URL:', `${process.env.NEXT_PUBLIC_API_URL}`);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/login-bg.jpg')]">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-2">
          WELCOME TO TodoBliss!
        </h2>
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Login' : 'Signup'}
        </h2>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center mt-6">
          {mode === 'login' ? (
            <p>Not a member? <a href="/signup" className="text-blue-500 hover:underline">Join Us</a></p>
          ) : (
            <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
