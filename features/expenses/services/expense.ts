import { mockExpenses } from "../data/mockExpense";

import type { Expense } from "../types/expense";

export async function getExpenses(): Promise<Expense[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockExpenses;
}
