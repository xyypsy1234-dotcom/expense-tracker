"use client";
import { useReportData } from "@/features/reports/hooks/useReportData";
import { ReportFilters } from "@/features/reports/components/ReportFilters";
import { ReportSummary } from "@/features/reports/components/ReportSummary";

export default function ReportsPage() {
  const {
    selectedYear,
    setSelectedYear,
    availableYear,
    totalExpenses,
    averageExpense,
    highestExpense,
    topCategory,
  } = useReportData();
  return (
    <div className="space-y-3">
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
    </div>
  );
}
