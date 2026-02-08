"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      // 1. Grab the token directly
      const token = localStorage.getItem("auth-token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // 2. Manually fetch the session with the header explicitly attached
        const res = await fetch("http://localhost:8000/api/auth/get-session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // <--- This cannot fail
          }
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid/expired
          localStorage.removeItem("auth-token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Session check failed", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  // Only render children (Dashboard) if we are authenticated
  return isAuthenticated ? <>{children}</> : null;
}