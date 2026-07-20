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
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!user) return null;

  return (
    <div>
      {isLoading ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id}>
            <p>{expense.title}</p>
            <p>Amount: ${expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.date.toDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
