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
import { usePreferences } from "@/features/setting/context/PreferencesContext";

interface CategoryReportData {
  category: string;
  amount: number;
}

interface CategoryBreakdownProps {
  data: CategoryReportData[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const { formatCurrency } = usePreferences();

  return (
    <section className="rounded-xl border bg-white p-1 shadow-sm">
      <div className="mb-1">
        <h2 className="text-lg font-semibold">Category Breakdown</h2>
        <p className="text-sm text-gray-500">
          Compare spending across categories
        </p>
      </div>
      {data.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-gray-500">
          No category data available
        </div>
      ) : (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 5,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                // dataKey="amount"
                domain={[0, 200]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => formatCurrency(value)}
              />
              <YAxis
                type="category"
                dataKey="category"
                tickLine={false}
                axisLine={false}
                width={90}
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  "Spending",
                ]}
              />
              <Bar
                dataKey="amount"
                name="Spending"
                fill="#a5a7ad"
                radius={[0, 6, 6, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
