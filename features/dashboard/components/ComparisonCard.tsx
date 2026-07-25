import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

interface ComparisonCardProps {
  thisMonthExpenses: number;
  lastMonthExpenses: number;
  percentageChange: number;
  hasLastMonthData: boolean;
}

export function ComparisonCard({
  thisMonthExpenses,
  lastMonthExpenses,
  percentageChange,
  hasLastMonthData,
}: ComparisonCardProps) {
  const isIncrease = percentageChange > 0;
  const isDecrease = percentageChange < 0;
  const difference = thisMonthExpenses - lastMonthExpenses;

  const colorClass = isIncrease
    ? "font-semibold text-red-500"
    : isDecrease
      ? "font-semibold text-green-500"
      : "font-semibold text-gray-500";

  const signPrefix = isIncrease ? "+" : isDecrease ? "-" : "";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold"> Compared to Last Month </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500"> This Month</p>
          <p className="text-3xl font-bold"> €{thisMonthExpenses.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          {isIncrease && <ArrowUpRight className="text-red-500" size={24} />}
          {isDecrease && (
            <ArrowDownRight className="text-green-500" size={24} />
          )}
          {!isIncrease && !isDecrease && (
            <Minus className="text-gray-500" size={24} />
          )}
          <span className={colorClass}>
            {!hasLastMonthData
              ? "No spending data for last month"
              : `${signPrefix}${Math.abs(percentageChange).toFixed(2)}%`}
          </span>
          <span className="text-sm text-gray-500"> vs Last Month </span>
        </div>
        <div className="border-t pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span> Last Month</span>
            <span>€{lastMonthExpenses.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span> Difference</span>
            <span className={colorClass}>
              {difference > 0 ? "+" : difference < 0 ? "-" : ""}€
              {Math.abs(difference).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
