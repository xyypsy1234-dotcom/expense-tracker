interface QuickStatesCardProps {
  totalExpenses: number;
  totalTransactions: number;
  averageExpense: number;
}

export function QuickStatsCard({
  totalExpenses,
  totalTransactions,
  averageExpense,
}: QuickStatesCardProps) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold"> Quick StatS</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Total Expenses</span>
          <span className="font-semibold">€{totalExpenses.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span> Total Transactions</span>
          <span className="font-semibold">{totalTransactions} </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Average Expense</span>
          <span className="semibold">€{averageExpense.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
