"use client";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from "recharts";

interface CategoryChartData {
  name: string;
  value: number;
  color: string;
}

interface CategoryPieChartProps {
  data: CategoryChartData[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const totalValue = data.reduce((total, item) => total + item.value, 0);

  return (
    <section className="rounded-xl border bg-white p-2 shadow-sm">
      <div className="mb-1">
        <h2 className="text-lg font-semibold"> Spending By Category</h2>
        <p className="mt-1 text-sm text-gray-500">
          Distribution of your expenses
        </p>
      </div>
      {data.length === 0 ? (
        <div className="flex h-25 items-center justify-center text-sm text-gray-500">
          No data available
        </div>
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="40%"
                innerRadius="42%"
                outerRadius="68%"
                paddingAngle={3}
                shape={(props) => {
                  const { payload } = props;
                  return <Sector {...props} fill={payload.color} />;
                }}
              />
              <Tooltip
                formatter={(value, name) => {
                  const amount = Number(value);
                  const percentage =
                    totalValue === 0 ? 0 : (amount / totalValue) * 100;
                  return [
                    `€${amount.toFixed(2)} (${percentage.toFixed(2)}%)`,
                    name,
                  ];
                }}
              />
              <Legend
                position="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
