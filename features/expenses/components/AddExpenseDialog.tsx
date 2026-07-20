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
        <button className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
          Add Expense
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
