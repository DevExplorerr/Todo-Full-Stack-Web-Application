"use client";

import { useState } from "react";
import api from "../../lib/api";
import { PlusCircle, Loader2 } from "lucide-react";

export default function TaskForm({
  onTaskCreated,
}: {
  onTaskCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await api.createTask({ title, description });
      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
      <div>
        <label htmlFor="title" className="sr-only">Task Title</label>
        <input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg font-medium placeholder:text-gray-400 border-0 border-b-2 border-gray-100 px-0 py-2 focus:ring-0 focus:border-blue-500 transition-colors"
        />
      </div>
      
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Add details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 text-sm text-gray-600 placeholder:text-gray-400 bg-gray-50 border-0 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-100 transition-all"
        />
        <button 
            type="submit" 
            disabled={!title.trim() || isSubmitting}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
            {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <>
                    <PlusCircle className="h-5 w-5" />
                    <span>Add Task</span>
                </>
            )}
        </button>
      </div>
    </form>
  );
}
