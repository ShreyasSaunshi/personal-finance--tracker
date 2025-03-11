"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction, DEFAULT_CATEGORIES } from "@/lib/types";

type CategoryChartProps = {
  transactions: Transaction[];
};

export function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryData = transactions.reduce((acc, transaction) => {
    const category = DEFAULT_CATEGORIES.find((c) => c.id === transaction.categoryId);
    if (!category) return acc;

    if (!acc[category.id]) {
      acc[category.id] = {
        name: category.name,
        value: 0,
        color: category.color,
      };
    }
    acc[category.id].value += transaction.amount;
    return acc;
  }, {} as Record<string, { name: string; value: number; color: string }>);

  const data = Object.values(categoryData);

  return (
    <div className="h-[300px] w-full">
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, value }) => `${name}: ₹${value.toFixed(2)}`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`₹${value.toFixed(2)}`, "Amount"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}