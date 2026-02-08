"use client";

import { Task } from "../../types";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (task: Task) => void;
}

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
        task.is_completed
          ? "bg-gray-50 border-gray-100"
          : "bg-white border-gray-200 hover:border-blue-200"
      }`}
    >
      {/* Checkbox / Toggle */}
      <button
        onClick={() => onToggle(task)}
        className={`mt-1 flex-shrink-0 transition-colors ${
          task.is_completed
            ? "text-green-500"
            : "text-gray-300 hover:text-blue-500"
        }`}
      >
        {task.is_completed ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <Circle className="h-6 w-6" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-base font-medium truncate transition-all ${
            task.is_completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`mt-1 text-sm truncate ${
              task.is_completed ? "text-gray-300 line-through" : "text-gray-500"
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="mt-2 text-xs text-gray-400">
          {new Date(task.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Delete Button (Only visible on hover or mobile) */}
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="Delete task"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}
