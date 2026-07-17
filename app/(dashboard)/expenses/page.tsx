"use client";
import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { ExpenseTable } from "@/features/expenses/components/ExpenseTable";
export default function ExpensesPage() {
  const { expenses } = useExpenses();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Expenses</h1>
      <ExpenseTable expenses={expenses} />
    </div>
  );
}
