"use client";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { QuickStatsCard } from "./QuickStatsCard";
import { ComparisonCard } from "./ComparisonCard";
import { RecentTransactions } from "./RecentTransactions";
import { SpendingTrendChart } from "./SpendingTrendChart";

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
  } = useDashboardStats();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-4 w-full">
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
      <div>
        <SpendingTrendChart trendData={lineData} />
      </div>
      <div>
        <div>category pie chart placeholder</div>
        <div>
          <RecentTransactions expenses={latestExpenses} />
        </div>
      </div>
    </div>
  );
}
