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
    yearlyExpenses.length === 0
      ? null
      : yearlyExpenses.reduce(
          (highest, expense) =>
            expense.amount > highest.amount ? expense : highest,
          yearlyExpenses[0],
        );
  const categoryTotals = yearlyExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const categoryReportData = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);

  const topCategory = categoryReportData[0] ?? null;

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

  const availableYear = Array.from(
    new Set(expenses.map((expense) => expense.date.getFullYear())),
  ).sort((a, b) => b - a);

  return {
    expenses,
    availableYear,
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
    categoryReportData,
  };
}
