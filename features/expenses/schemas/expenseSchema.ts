import { z } from "zod";

export const categories = [
  "Food",
  "Transport",
  "Education",
  "Health",
  "Utilities",
  "Shopping",
  "Other",
] as const;

export const expenseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be at most 50 characters" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  category: z.enum(categories, { message: "Please select a category" }),
  date: z.coerce.date(),
  note: z.string().optional(),
});

export const updateExpenseSchema = expenseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type ExpenseFormInput = z.input<typeof expenseSchema>;
export type ExpenseFormData = z.output<typeof expenseSchema>;
export type Category = (typeof categories)[number];
export type UpdateExpenseData = z.infer<typeof updateExpenseSchema>;
