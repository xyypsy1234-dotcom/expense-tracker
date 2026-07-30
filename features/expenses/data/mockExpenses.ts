import type { Expense } from "../types/expense";

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 50,
    category: "Food",
    date: new Date("2026-04-01"),
    note: "Bought fruits and vegetables",
  },
  {
    id: "2",
    title: "Electricity Bill",
    amount: 100,
    category: "Utilities",
    date: new Date("2026-05-02"),
    note: "Paid electricity bill for May",
  },
  {
    id: "3",
    title: "Movie Tickets",
    amount: 30,
    category: "Shopping",
    date: new Date("2026-06-03"),
    note: "Bought tickets for a movie",
  },
];
