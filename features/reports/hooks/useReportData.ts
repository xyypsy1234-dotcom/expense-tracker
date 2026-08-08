"use client";
import { useDashBoardStats } from "@/features/dashboard/hooks/useDashBoardStats";
import { useExpenseContext } from "@/features/expenses/context/ExpenseContext";
import { useState } from "react";

export function useReportData() {
  const { expenses } = useExpenseContext();
  const { monthlyExpenses } = useDashBoardStats();
  const [selectedYear, setSelectedYear] = useState(2026);

  const yearlyExpenses = expenses.filter(
    (expense) => expense.date.getFullYear() === selectedYear,
  );

  const totalExpenses = yearlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const averageExpense =
    yearlyExpenses.length === 0 ? 0 : totalExpenses / yearlyExpenses.length;

  const highestExpense =
    expenses.length === 0
      ? null
      : expenses.reduce(
          (highest, expense) =>
            expense.amount > highest.amount ? expense : highest,
          expenses[0],
        );
  const categoryTotals = yearlyExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categoryEntries = Object.entries(categoryTotals);
  const topCategory =
    categoryEntries.length === 0
      ? null
      : categoryEntries.reduce(
          (max, current) => (current[1] > max[1] ? current : max),
          categoryEntries[0],
        );

  const monthlyReportData = Object.entries(monthlyExpenses)
    .filter(([key]) => key.startsWith(`${selectedYear}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => {
      const [, month] = key.split("-");
      const label = new Date(
        selectedYear,
        Number(month) - 1,
        2,
      ).toLocaleDateString("en-IE", { month: "short" });
      return { label, value };
    });

  const exportData = yearlyExpenses.map((expense) => ({
    Date: expense.date.toLocaleDateString("en-IE"),
    Title: expense.title,
    Category: expense.category,
    Amount: expense.amount.toFixed(2),
    Note: expense.note ?? "",
  }));

  return {
    totalExpenses,
    averageExpense,
    categoryTotals,
    monthlyExpenses,
    highestExpense,
    topCategory,
    selectedYear,
    setSelectedYear,
    yearlyExpenses,
    monthlyReportData,
    exportData,
  };
}
