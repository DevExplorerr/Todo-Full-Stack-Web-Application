"use client";

import TaskForm from "../../components/tasks/TaskForm";
import TaskList from "../../components/tasks/TaskList";
import { useState, useEffect } from "react";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import { LogOut, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userName, setUserName] = useState("User");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("user-name");
    if (storedName) setUserName(storedName);
  }, []);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-name");
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  TaskFlow
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 hidden sm:block">
                  Welcome, {userName}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-8">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
              <p className="mt-2 text-gray-600">
                Stay organized and get things done.
              </p>
            </div>

            <TaskForm onTaskCreated={handleTaskCreated} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <TaskList refreshTrigger={refreshTrigger} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
