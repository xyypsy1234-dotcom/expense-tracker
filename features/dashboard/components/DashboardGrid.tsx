"use client";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { QuickStatesCard } from "./QuickStatesCard";
import { ComparisonCard } from "./ComparisonCard";

export function DashboardGrid() {
  const {
    totalExpenses,
    totalTransactions,
    averageExpense,
    thisMonthExpenses,
    lastMonthExpenses,
    percentageChange,
    hasLastMonthData,
  } = useDashboardStats();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full">
        <QuickStatesCard
          totalExpenses={totalExpenses}
          totalTransactions={totalTransactions}
          averageExpense={averageExpense}
        />
        <ComparisonCard
          thisMonthExpenses={thisMonthExpenses}
          lastMonthExpenses={lastMonthExpenses}
          percentageChange={percentageChange}
          hasLastMonthData={hasLastMonthData}
        />
      </div>
    </div>
  );
}
