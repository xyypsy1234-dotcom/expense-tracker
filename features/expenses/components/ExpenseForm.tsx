"use client";

import {
  categories,
  expenseSchema,
  type ExpenseFormData,
  type ExpenseFormInput,
} from "../schemas/expenseSchema";
import type { Expense } from "../types/expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExpenseContext } from "../context/ExpenseContext";

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: () => void;
}

export function ExpenseForm({ expense, onSuccess }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormInput, unknown, ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
          title: expense.title,
          amount: expense.amount,
          category: expense.category,
          date: expense.date.toISOString().slice(0, 10),
          note: expense.note,
        }
      : undefined,
  });

  const { addExpense, updateExpense } = useExpenseContext();

  const onSubmit = async (data: ExpenseFormData) => {
    if (expense) {
      await updateExpense({
        ...expense,
        ...data,
      });
    } else {
      await addExpense(data);
      reset();
    }

    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title")}
          className="rounded-md border p-2"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("category")}
          defaultValue=""
          className="rounded-md border p-2"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          {...register("amount")}
          className="rounded-md border p-2"
          type="number"
          step="0.01"
        />
        {errors.amount && (
          <span className="text-red-500">{errors.amount.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          {...register("date")}
          className="rounded-md border p-2"
          type="date"
        />
        {errors.date && (
          <span className="text-red-500">{errors.date.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          {...register("note")}
          className="rounded-md border p-2"
        />
        {errors.note && (
          <span className="text-red-500">{errors.note.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-green-600 p-2 text-white"
      >
        {isSubmitting
          ? expense
            ? "Updating..."
            : "Creating..."
          : expense
            ? "Update Expense"
            : "Add Expense"}
      </button>
    </form>
  );
}
