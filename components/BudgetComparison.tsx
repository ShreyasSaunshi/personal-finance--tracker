"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction, Budget, DEFAULT_CATEGORIES } from "@/lib/types";

type BudgetComparisonProps = {
  transactions: Transaction[];
  budgets: Budget[];
  month: string; // YYYY-MM
};

export function BudgetComparison({
  transactions,
  budgets,
  month,
}: BudgetComparisonProps) {
  const categorySpending = transactions
    .filter((t) => t.date.toISOString().slice(0, 7) === month)
    .reduce((acc, transaction) => {
      if (!acc[transaction.categoryId]) {
        acc[transaction.categoryId] = 0;
      }
      acc[transaction.categoryId] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = DEFAULT_CATEGORIES.map((category) => {
    const budget = budgets.find((b) => b.categoryId === category.id && b.month === month);
    return {
      name: category.name,
      budget: budget?.amount || 0,
      actual: categorySpending[category.id] || 0,
      color: category.color,
    };
  });

  return (
    <div className="h-[300px] w-full">
      {data.every((d) => d.budget === 0 && d.actual === 0) ? (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No budget or spending data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`₹${value.toFixed(2)}`, ""]} />
            <Legend />
            <Bar dataKey="budget" name="Budget" fill="hsl(var(--primary))" />
            <Bar dataKey="actual" name="Actual" fill="hsl(var(--destructive))" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}