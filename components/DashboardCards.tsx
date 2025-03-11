"use client";

import { Card } from "@/components/ui/card";
import { Transaction, Budget, DEFAULT_CATEGORIES } from "@/lib/types";

type DashboardCardsProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export function DashboardCards({ transactions, budgets }: DashboardCardsProps) {
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = transactions
    .filter((t) => t.date.toISOString().slice(0, 7) === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyBudget = budgets
    .filter((b) => b.month === currentMonth)
    .reduce((sum, b) => sum + b.amount, 0);

  const categorySpending = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.categoryId]) {
      acc[transaction.categoryId] = 0;
    }
    acc[transaction.categoryId] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)[0];

  const topCategoryName = topCategory
    ? DEFAULT_CATEGORIES.find((c) => c.id === topCategory[0])?.name
    : "N/A";

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
        <p className="mt-2 text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
      </Card>
      
      <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-sm font-medium text-muted-foreground">Monthly Expenses</h3>
        <p className="mt-2 text-2xl font-bold">₹{monthlyExpenses.toFixed(2)}</p>
      </Card>
      
      <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-sm font-medium text-muted-foreground">Monthly Budget</h3>
        <p className="mt-2 text-2xl font-bold">₹{monthlyBudget.toFixed(2)}</p>
      </Card>
      
      <Card className="p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <h3 className="text-sm font-medium text-muted-foreground">Top Category</h3>
        <p className="mt-2 text-2xl font-bold">{topCategoryName}</p>
      </Card>
    </div>
  );
}