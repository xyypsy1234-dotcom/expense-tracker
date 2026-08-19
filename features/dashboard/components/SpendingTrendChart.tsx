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
import { usePreferences } from "../../setting/context/PreferencesContext";


interface TrendDataItem {
  label: string;
  value: number;
}

interface SpendingTrendChartProps {
  trendData: TrendDataItem[];
}

export function SpendingTrendChart({ trendData }: SpendingTrendChartProps) {
 const { formatCurrency } = usePreferences();


  return (
    <section className="rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-semibold">Monthly Spending Trend</h2>
        <p className="mt-1 text-sm text-gray-500">

          Your spending across recent months.
        </p>
      </div>
      {trendData.length === 0 ? (
        <div className="flex h-50 items-center justify-center text-gray-500 text-sm">
          No spending data available
        </div>
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
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
