"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { ExpenseForm } from "@/features/expenses/components/ExpenseForm";

export function AddExpenseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="rounded-md text-sm bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          Add Expenses
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
        </DialogHeader>
        <ExpenseForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
