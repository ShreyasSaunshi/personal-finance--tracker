export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Budget = {
  id: string;
  categoryId: string;
  amount: number;
  month: string; // Format: "YYYY-MM"
};

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "groceries", name: "Groceries", color: "hsl(var(--chart-1))" },
  { id: "utilities", name: "Utilities", color: "hsl(var(--chart-2))" },
  { id: "entertainment", name: "Entertainment", color: "hsl(var(--chart-3))" },
  { id: "transport", name: "Transport", color: "hsl(var(--chart-4))" },
  { id: "shopping", name: "Shopping", color: "hsl(var(--chart-5))" },
];