"use client" // Add this line to mark the component as a Client Component

import { useState, useEffect } from "react"
import { TodoList } from "@/app/Components/todos/Todo-list"
import { AddTodoForm } from "@/app/Components/todos/Add-todo-form"
import api from "@/app/api/api"

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([]) // State to hold todos

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.get("/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTodos(response.data) // Update the todos state
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    }
  }

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D] text-transparent bg-clip-text">
            My Tasks
          </h1>
          <p className="text-gray-400">Manage your tasks and stay organized</p>
        </div>
        {/* Pass the fetchTodos function as the refreshTodos prop */}
        <AddTodoForm refreshTodos={fetchTodos} />
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </div>
    </div>
  )
}
