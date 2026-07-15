"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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
    </div>
  );
}
