"use client";
import { useReportData } from "@/features/reports/hooks/useReportData";
import { ReportFilters } from "@/features/reports/components/ReportFilters";
import { ReportSummary } from "@/features/reports/components/ReportSummary";
import { MonthlySpendingBarChart } from "@/features/reports/components/MonthlySpendingBarChart";
import { CategoryBreakdown } from "@/features/reports/components/CategoryBreakdown";

export default function ReportsPage() {
  const {
    selectedYear,
    setSelectedYear,
    availableYear,
    totalExpenses,
    averageExpense,
    highestExpense,
    topCategory,
    monthlyReportData,
    categoryReportData,
  } = useReportData();
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold"> Reports</h1>
          <p className="text-sm text-gray-500">
            Analyse your spending patterns and trends
          </p>
        </div>
        <div>
          <ReportFilters
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            years={availableYear}
          />
        </div>
      </div>
      <div>
        <ReportSummary
          totalExpenses={totalExpenses}
          averageExpense={averageExpense}
          highestExpense={highestExpense}
          topCategory={topCategory}
        />
      </div>
      <div>
        <MonthlySpendingBarChart data={monthlyReportData} />
      </div>
      <div>
        <CategoryBreakdown data={categoryReportData} />
      </div>
    </div>
  );
}
