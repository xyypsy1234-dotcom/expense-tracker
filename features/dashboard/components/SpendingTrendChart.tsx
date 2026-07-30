"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendDataItem {
  label: string;
  value: number;
}

interface SpendingTrendChartProps {
  trendData: TrendDataItem[];
}

export function SpendingTrendChart({ trendData }: SpendingTrendChartProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Monthly Spending Trend</h2>
        <p className="mt-1 text-sm text-gray-500">
          {" "}
          Your spending across recent months.
        </p>
      </div>
      {trendData.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-gray-500 text-sm">
          No spending data available
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip
                formatter={(value) => [
                  `€${Number(value).toFixed(2)}`,
                  "Spending",
                ]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
