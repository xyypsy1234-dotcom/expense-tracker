import { ReportSummaryCard } from "./ReportSummaryCard";
import type { Expense } from "@/features/expenses/types/expense";
import { usePreferences } from "@/features/setting/context/PreferencesContext";

interface ReportSummaryProps {
  totalExpenses: number;
  averageExpense: number;
  highestExpense: Expense | null;
  topCategory: { category: string; amount: number } | null;
}

export function ReportSummary({
  totalExpenses,
  averageExpense,
  highestExpense,
  topCategory,
}: ReportSummaryProps) {
  const { formatCurrency } = usePreferences();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3  w-full">
        <ReportSummaryCard
          title="Total Spend"
          value={`${formatCurrency(totalExpenses)}`}
        />

        <ReportSummaryCard
          title="Average Expense"
          value={`${formatCurrency(averageExpense)}`}
        />

        <ReportSummaryCard
          title="Highest Expense"
          value={
            highestExpense
              ? `${formatCurrency(highestExpense.amount)}`
              : "€0.00"
          }
          subtitle={highestExpense?.title}
        />

        <ReportSummaryCard
          title="Top Category"
          value={
            topCategory ? `${formatCurrency(topCategory.amount)}` : "No data"
          }
          subtitle={topCategory?.category ?? "No data"}
        />
      </div>
    </div>
  );
}
