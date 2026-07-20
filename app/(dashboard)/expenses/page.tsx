"use client";

import { ExpenseForm } from "@/features/expenses/components/ExpenseForm";
import { ExpenseTable } from "@/features/expenses/components/ExpenseTable";
import { useExpenseContext } from "@/features/expenses/context/ExpenseContext";
import { AddExpenseDialog } from "@/features/expenses/components/AddExpenseDialog";

export default function ExpensesPage() {
  const { expenses,  isLoadingExpenses } = useExpenseContext();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Expenses</h1>
      <AddExpenseDialog />

      {isLoadingExpenses ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ExpenseTable expenses={expenses} />
      )}
    </div>
  );
}
