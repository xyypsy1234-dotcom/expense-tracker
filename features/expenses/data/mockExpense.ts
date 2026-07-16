import type { Expense } from "../types/expense";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 50,
    category: "Food",
    date: new Date("2026-06-01"),
  },
  {
    id: "2",
    title: "Electricity Bill",
    amount: 100,
    category: "Utilities",
    date: new Date("2026-06-02"),
  },
  {
    id: "3",
    title: "Movie Tickets",
    amount: 30,
    category: "Entertainment",
    date: new Date("2026-06-03"),
  },
];
