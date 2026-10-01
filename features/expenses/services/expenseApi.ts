import type {
  ExpenseFormData,
  UpdateExpenseData,
} from "../schemas/expenseSchema";
import type { Expense, ExpenseApiResponse } from "../types/expense";
import { ApiError } from "@/features/shared/utils/ApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapExpenseResponse(expense: ExpenseApiResponse): Expense {
  return {
    id: expense.id,
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: new Date(expense.date),
    note: expense.note,
  };
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(`${API_URL}/api/expenses`, {
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
    throw new ApiError("Failed to fetch expenses", response.status);
  }

  const data: ExpenseApiResponse[] = await response.json();

  return data.map(mapExpenseResponse);
}

export async function createExpense(data: ExpenseFormData): Promise<Expense> {
  const response = await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
    throw new ApiError("Failed to create expense", response.status);
  }
  const createdExpense: ExpenseApiResponse = await response.json();
  return mapExpenseResponse(createdExpense);
}

export async function updateExpense(
  id: string,
  data: UpdateExpenseData,
): Promise<Expense> {
  const response = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
    throw new ApiError("Failed to update expense", response.status);
  }
  const updatedExpense: ExpenseApiResponse = await response.json();
  return mapExpenseResponse(updatedExpense);
}

export async function deleteExpense(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new ApiError("Your session has expired. Please log in again.", 401);
    }
    throw new ApiError("Failed to delete expense", response.status);
  }
}
