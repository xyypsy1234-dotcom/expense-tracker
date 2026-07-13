"use client";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome, {user?.name}!</p>
      <p>{user?.email}</p>
    </div>
  );
}
