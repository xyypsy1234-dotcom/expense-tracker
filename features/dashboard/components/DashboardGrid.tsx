"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { QuickStatsCard } from "./QuickStatsCard";
import { ComparisonCard } from "./ComparisonCard";
import { RecentTransactions } from "./RecentTransactions";
import { SpendingTrendChart } from "./SpendingTrendChart";
import { CategoryPieChart } from "./CategoryPieChart";

export function DashboardGrid() {
  const {
    totalExpenses,
    totalTransactions,
    averageExpense,
    thisMonthExpenses,
    lastMonthExpenses,
    percentageChange,
    hasLastMonthData,
    latestExpenses,
    lineData,
    pieData,
  } = useDashboardStats();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-3 w-full">
        <QuickStatsCard
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
      <div className="w-full">
        <SpendingTrendChart trendData={lineData} />
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <CategoryPieChart data={pieData} />

        <RecentTransactions expenses={latestExpenses} />
      </div>
    </div>
  );
}
