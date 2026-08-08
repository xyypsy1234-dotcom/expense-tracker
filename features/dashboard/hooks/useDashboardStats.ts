import { useMemo } from "react";
import { useExpenseContext } from "@/features/expenses/context/ExpenseContext";

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function useDashBoardStats() {
  const { expenses } = useExpenseContext();

  return useMemo(() => {
    const now = new Date();

    // basical stats
    const totalExpenses = expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);

    const totalTransactions = expenses.length;

    const averageExpense =
      totalTransactions === 0 ? 0 : totalExpenses / totalTransactions;

    const latestExpenses = [...expenses]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    const categoryTotals = expenses.reduce(
      (acc, expense) => {
        acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;

        return acc;
      },
      {} as Record<string, number>,
    );

    const monthlyExpenses = expenses.reduce(
      (acc, expense) => {
        const key = getMonthKey(expense.date);
        acc[key] = (acc[key] ?? 0) + expense.amount;

        return acc;
      },
      {} as Record<string, number>,
    );

    const thisMonthKey = getMonthKey(now);
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
    const lastMonthKey = getMonthKey(lastMonthDate);
    const lastMonthExpenses = monthlyExpenses[lastMonthKey] ?? 0;
    const thisMonthExpenses = monthlyExpenses[thisMonthKey] ?? 0;

    const percentageChange =
      lastMonthExpenses === 0
        ? 0
        : ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    const hasLastMonthData = lastMonthExpenses > 0;

    const lineData = Object.entries(monthlyExpenses)
      .sort(([a], [b]) => {
        return a.localeCompare(b);
      })
      .map(([key, value]) => {
        const [year, month] = key.split("-");
        const label = new Date(
          Number(year),
          Number(month) - 1,
          2,
        ).toLocaleDateString("en-IE", {
          month: "short",
          year: "numeric",
        });
        return {
          label,
          value,
        };
      });

    const categoryColors: Record<string, string> = {
      Food: "#FF33FF",
      Education: "#33FF57",
      Health: "#FFA500",
      Utilities: "#5733FF",
      Transport: "#FF3357",
      Shopping: "#57FF33",
      Other: "#3357FF",
    };

    const pieData = Object.entries(categoryTotals).map(([category, value]) => ({
      name: category,
      value,
      color: categoryColors[category] ?? "#333333",
    }));

    return {
      expenses,
      totalExpenses,
      totalTransactions,
      averageExpense,
      latestExpenses,
      categoryTotals,
      monthlyExpenses,
      lineData,
      pieData,
      hasLastMonthData,
      percentageChange,
      lastMonthExpenses,
      thisMonthExpenses,
    };
  }, [expenses]);
}
