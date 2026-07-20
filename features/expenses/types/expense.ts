import type { Category } from "../schemas/expenseSchema";
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: Date;
  note?: string;
}
