"use client"

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Check, Pencil } from "lucide-react";
import api from "@/app/api/api";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

interface TodoListProps {
  todos: Todo[];
  fetchTodos: () => void;
}

export function TodoList({ todos, fetchTodos }: TodoListProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  // Toggle todo completion status
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/todos/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      toast("Failed to update task");
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTodos(); // Refresh the todo list
      toast("Task deleted");
    } catch (error) {
      toast("Failed to delete task");
    }
  };

  // Start editing a todo
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  // Update a todo
  const updateTodo = async (id: string) => {
    if (!editValue.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await api.put( // Use PUT instead of PATCH
        `/todos/${id}`,
        { content: editValue }, // Ensure this matches the backend schema
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchTodos(); // Refresh the todo list
      setEditingId(null);
      toast("Task updated");
    } catch (error) {
      toast("Failed to update task");
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-[#4ECDC4]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["all", "active", "completed"] as const).map((filterType) => (
          <Button
            key={filterType}
            variant={filter === filterType ? "default" : "outline"}
            onClick={() => setFilter(filterType)}
            className={
              filter === filterType
                ? "bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white"
                : "border-gray-800 text-white hover:bg-gray-800"
            }
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-4 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleTodo(todo.id, todo.completed)}
                className={`shrink-0 ${
                  todo.completed ? "text-[#4ECDC4] hover:text-[#4ECDC4]/90" : "text-gray-400 hover:text-white"
                }`}
              >
                <Check className={`h-5 w-5 ${todo.completed ? "opacity-100" : "opacity-0"}`} />
              </Button>

              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 bg-gray-800/50 border-gray-700 text-white"
                    autoFocus
                  />
                  <Button onClick={() => updateTodo(todo.id)} className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white">
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(null)}
                    className="border-gray-800 text-white hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <span className={`flex-1 ${todo.completed ? "line-through text-white" : "text-white"}`}>
                  {todo.title}
                </span>
              )}

              {editingId !== todo.id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(todo)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}