import type { Category } from "../schemas/expenseSchema";
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: Date;
  note?: string;
}

export interface ExpenseApiResponse {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
  createdAt:string;
  updatedAt:string;
}
