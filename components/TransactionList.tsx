"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Transaction, DEFAULT_CATEGORIES } from "@/lib/types";
import { TransactionForm } from "./TransactionForm";

type TransactionListProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
};

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(
    null
  );

  const handleEdit = (transaction: Transaction) => {
    onEdit(transaction);
    setEditingTransaction(null);
  };

  const getCategoryName = (categoryId: string) => {
    return DEFAULT_CATEGORIES.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const getCategoryColor = (categoryId: string) => {
    return DEFAULT_CATEGORIES.find((c) => c.id === categoryId)?.color || "gray";
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No transactions yet
                </TableCell>
              </TableRow>
            ) : (
              transactions
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {transaction.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: getCategoryColor(transaction.categoryId),
                          color: "white",
                        }}
                      >
                        {getCategoryName(transaction.categoryId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingTransaction(transaction)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={editingTransaction !== null}
        onOpenChange={(open) => !open && setEditingTransaction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <TransactionForm
              onSubmit={handleEdit}
              initialData={editingTransaction}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}