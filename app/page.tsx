"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { CategoryChart } from "@/components/CategoryChart";
import { BudgetForm } from "@/components/BudgetForm";
import { BudgetComparison } from "@/components/BudgetComparison";
import { DashboardCards } from "@/components/DashboardCards";
import { ThemeToggle } from "@/components/theme-toggle";
import { Transaction, Budget } from "@/lib/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const currentMonth = new Date().toISOString().slice(0, 7);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const editTransaction = (updatedTransaction: Transaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const addBudget = (budget: Budget) => {
    const existingIndex = budgets.findIndex(
      (b) => b.categoryId === budget.categoryId && b.month === budget.month
    );
    
    if (existingIndex >= 0) {
      const newBudgets = [...budgets];
      newBudgets[existingIndex] = budget;
      setBudgets(newBudgets);
    } else {
      setBudgets([...budgets, budget]);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold animate-slide-up">
            Personal Finance Tracker
          </h1>
          <ThemeToggle />
        </div>

        <div className="animate-fade-in">
          <DashboardCards transactions={transactions} budgets={budgets} />
        </div>
        
        <Tabs defaultValue="transactions" className="mt-8 animate-scale">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="animate-fade-in">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
                <TransactionForm onSubmit={addTransaction} />
              </Card>

              <div className="grid gap-8">
                <Card className="p-6 transition-shadow hover:shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
                  <MonthlyExpensesChart transactions={transactions} />
                </Card>

                <Card className="p-6 transition-shadow hover:shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Category Breakdown</h2>
                  <CategoryChart transactions={transactions} />
                </Card>
              </div>
            </div>

            <Card className="mt-8 p-6 transition-shadow hover:shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
              <TransactionList
                transactions={transactions}
                onEdit={editTransaction}
                onDelete={deleteTransaction}
              />
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="animate-fade-in">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Set Budget</h2>
                <BudgetForm onSubmit={addBudget} />
              </Card>

              <Card className="p-6 transition-shadow hover:shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Budget vs Actual</h2>
                <BudgetComparison
                  transactions={transactions}
                  budgets={budgets}
                  month={currentMonth}
                />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}