"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
      return;
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user.name}!</p>
      <p>{user.email}</p>
      <div>
        <button
          onClick={handleLogout}
          className="px-2 py-1.5 text-gray-500 hover:text-black font-medium "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
