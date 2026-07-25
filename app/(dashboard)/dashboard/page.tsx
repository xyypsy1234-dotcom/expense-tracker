"use client";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardGrid } from "@/features/dashboard/components/DashboardGrid";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user) return null;

  return (
    <div>
      <DashboardGrid />
    </div>
  );
}
