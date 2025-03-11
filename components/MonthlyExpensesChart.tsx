"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/lib/types";

type MonthlyExpensesChartProps = {
  transactions: Transaction[];
};

export function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = transaction.date.toLocaleString("default", { month: "short" });
    const year = transaction.date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month,
      amount,
    }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(" ");
      const [bMonth, bYear] = b.month.split(" ");
      return (
        new Date(Date.parse(`${aMonth} 1, ${aYear}`)).getTime() -
        new Date(Date.parse(`${bMonth} 1, ${bYear}`)).getTime()
      );
    });

  return (
    <div className="h-[300px] w-full">
      {chartData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`₹${value.toFixed(2)}`, "Amount"]}
            />
            <Bar
              dataKey="amount"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}