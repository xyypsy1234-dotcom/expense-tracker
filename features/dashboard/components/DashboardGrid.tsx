"use client";

import { useDashboardStats } from "../hooks/useDashboardStats";
import { QuickStatesCard } from "./QuickStatesCard";
import { ComparisonCard } from "./ComparisonCard";
import { RecentTransactions } from "./RecentTransactions";

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
      <div>spending trend chart placeholder</div>
      <div>
        <div>category pie chart placeholder</div>
        <div>
          <RecentTransactions expenses={latestExpenses} />
        </div>
      </div>
    </div>
  );
}
