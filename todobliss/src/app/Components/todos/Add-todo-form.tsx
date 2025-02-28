"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/app/api/api";

interface AddTodoFormProps {
  refreshTodos: () => void; // Define the prop
}

export function AddTodoForm({ refreshTodos }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/todos",
        { content: title }, // Send 'content' instead of 'title'
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      toast("Task added");
      refreshTodos(); // Refresh the todo list
    } catch (error) {
      console.error("Error adding task:", error);
      toast("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        <span className="ml-2">Add</span>
      </Button>
    </form>
  );
}