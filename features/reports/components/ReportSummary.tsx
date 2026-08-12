import { ReportSummaryCard } from "./ReportSummaryCard";
import type { Expense } from "@/features/expenses/types/expense";

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
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3  w-full">
        <ReportSummaryCard
          title="Total Spend"
          value={`€${totalExpenses.toFixed(2)}`}
        />

        <ReportSummaryCard
          title="Average Expense"
          value={`€${averageExpense.toFixed(2)}`}
        />

        <ReportSummaryCard
          title="Highest Expense"
          value={
            highestExpense ? `€${highestExpense.amount.toFixed(2)}` : "€0.00"
          }
          subtitle={highestExpense?.title}
        />

        <ReportSummaryCard
          title="Top Category"
          value={topCategory ? `€${topCategory.amount.toFixed(2)}` : "No data"}
          subtitle={topCategory?.category ?? "No data"}
        />
      </div>
    </div>
  );
}
