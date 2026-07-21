"use client";

import { useState, useMemo } from "react";
import { categories } from "@/features/expenses/schemas/expenseSchema";
import { ExpenseTable } from "@/features/expenses/components/ExpenseTable";
import { useExpenseContext } from "@/features/expenses/context/ExpenseContext";
import { AddExpenseDialog } from "@/features/expenses/components/AddExpenseDialog";

export default function ExpensesPage() {
  const { expenses, isLoadingExpenses } = useExpenseContext();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const categoryMatch =
        !categoryFilter || expense.category === categoryFilter;
      const dateMatch =
        !dateFilter || expense.date.toISOString().slice(0, 10) === dateFilter;
      return categoryMatch && dateMatch;
    });
  }, [expenses, categoryFilter, dateFilter]);

  return (
    <div className="flex flex-col  gap-3">
      <h1 className="text-2xl font-bold">Expenses Transactions</h1>
      <div className="flex items-center  gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border p-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-md border p-2"
        />
        <AddExpenseDialog />
      </div>
      {isLoadingExpenses ? (
        <p>Loading expenses...</p>
      ) : filteredExpenses.length === 0 ? (
        <p>
          {expenses.length === 0
            ? "No expenses yet."
            : "No expenses match your filters."}
        </p>
      ) : (
        <ExpenseTable expenses={filteredExpenses} />
      )}
    </div>
  );
}
