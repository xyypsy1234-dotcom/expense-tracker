"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MonthlyReportData {
  label: string;
  value: number;
}

interface MonthlySpendingBarChartProps {
  data: MonthlyReportData[];
}

export function MonthlySpendingBarChart({
  data,
}: MonthlySpendingBarChartProps) {
  return (
    <section className="rounded-xl border bg-white p-1 shadow-sm">
      <div className="mb-1">
        <h2 className="text-lg font-semibold">Monthly Spending</h2>
        <p className="text-sm text-gray-500">
          Spending by month for the selected year
        </p>
      </div>
      {data.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-gray-500">
          No spending data available
        </div>
      ) : (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => `€${value}`}
              />
              <Tooltip
                formatter={(value) => [
                  `€${Number(value).toFixed(2)}`,
                  "Spending",
                ]}
              />
              <Bar
                dataKey="value"
                name="Spending"
                fill="#a5a7ad"
                radius={[6, 6, 0, 0]}
                maxBarSize={34}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
