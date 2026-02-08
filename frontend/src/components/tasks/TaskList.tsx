"use client";

import { Task } from "../../types";
import api from "../../lib/api";
import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";

export default function TaskList({ refreshTrigger }: { refreshTrigger: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [refreshTrigger]);

  const loadTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (e) {
      console.error("Failed to load tasks", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      await api.deleteTask(id);
      loadTasks();
  };

  const handleToggle = async (task: Task) => {
      await api.updateTask(task.id, { is_completed: !task.is_completed });
      loadTasks();
  };

  if (loading) return (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onDelete={handleDelete} 
          onToggle={handleToggle} 
        />
      ))}
      {tasks.length === 0 && (
        <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 italic">No tasks yet. Add your first task above!</p>
        </div>
      )}
    </div>
  );
}
