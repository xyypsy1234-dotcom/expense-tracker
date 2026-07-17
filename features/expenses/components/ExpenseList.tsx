"use client";
import { useExpenses } from "../hooks/useExpenses";

export function ExpenseList() {
  const { expenses, isLoadingExpenses } = useExpenses();

  if (isLoadingExpenses) {
    return <p>Loading expenses...</p>;
  }

  return (
    <div>
      {isLoadingExpenses ? (
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
