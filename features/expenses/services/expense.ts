import { mockExpenses } from "../data/mockExpenses";

import type { Expense } from "../types/expense";

export async function getExpenses(): Promise<Expense[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockExpenses;
}
